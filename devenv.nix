{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: let
  pkgs-unstable = import inputs.nixpkgs-unstable {
    system = pkgs.stdenv.system;
  };

  env = {
    LD_LIBRARY_PATH = lib.makeLibraryPath [
      pkgs.stdenv.cc.cc.lib
    ];

    DB_HOST = "127.0.0.1";
    DB_PORT = "54300";
    DB_USER = "trena_dev";
    DB_PASSWORD = "postgres";
    JWT_SECRET = "super-secret-jwt-token-with-at-least-32-characters-long";
    DB_NAME = "trena";
    DATABASE_URL = "postgresql://trena_dev:postgres@127.0.0.1:54300/trena";
    EXPO_PUBLIC_SERVER_URL = "http://localhost:3003";

    # === Android ===
    ANDROID_KEYSTORE_PATH = "frontend/secrets/trena-release.keystore";
    ANDROID_KEY_ALIAS = "trena";
  };
in {
  env = env;

  dotenv.enable = true;

  packages = [
    pkgs.jq
    pkgs.watchman
    pkgs.tmux
    pkgs.bun
    pkgs.postgresql
    pkgs.eas-cli
    pkgs.tree
  ];

  services.postgres = {
    enable = true;

    package = pkgs.postgresql_16;

    listen_addresses = "127.0.0.1";
    port = lib.toInt env.DB_PORT;

    initialDatabases = [
      {name = env.DB_NAME;}
    ];

    initialScript = ''
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM pg_catalog.pg_roles
          WHERE rolname = '${env.DB_USER}'
        ) THEN
          CREATE ROLE "${env.DB_USER}"
            WITH LOGIN SUPERUSER PASSWORD '${env.DB_PASSWORD}';
        ELSE
          ALTER ROLE "${env.DB_USER}"
            WITH LOGIN SUPERUSER PASSWORD '${env.DB_PASSWORD}';
        END IF;
      END
      $$;

      ALTER DATABASE "${env.DB_NAME}"
        OWNER TO "${env.DB_USER}";

      \c "${env.DB_NAME}";
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    '';
  };
  scripts = {
    "db:migration" = {
      description = "Create a new SQL migration file";
      exec = ''./scripts/db-migration.sh "$@"'';
    };

    "db:migrate" = {
      description = "Apply DB migrations";
      exec = ''./scripts/db-migrate.sh'';
    };

    "db:reset" = {
      description = "Drop, recreate, and migrate database";
      exec = ''./scripts/db-reset.sh'';
    };

    "db:seed:dev" = {
      description = "Seed dev database";
      exec = ''./scripts/db-seed-dev.sh'';
    };
  };

  android = {
    enable = true;
    reactNative.enable = true;
    ndk.enable = true;
    platforms.version = ["36"];
    buildTools.version = ["36.0.0"];
    ndk.version = ["27.1.12297006"];
  };

  languages = {
    javascript.enable = true;
    javascript.pnpm.enable = true;
  };
}
