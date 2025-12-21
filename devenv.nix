{ pkgs, lib, config, inputs, ... }:
  let
    pkgs-unstable = import inputs.nixpkgs-unstable { system = pkgs.stdenv.system; };
    env = {
      POSTGRES_USER = "exil0681";
      POSTGRES_PASSWORD = "postgres";
      POSTGRES_DB = "trena";
      POSTGRES_PORT = 54300;
      POSTGRES_HOST = "127.0.0.1";
      ANDROID_KEYSTORE_PATH = "trena-release.keystore";
      ANDROID_KEY_ALIAS = "trena";

      # PGUSER = "postgres";
      # PGPASSWORD = "postgres";
      # PGDATABASE = "trena";
      # PGPORT = "54300";
      # PGHOST = "127.0.0.1";
    };
  in
{
  env = env;

  dotenv.enable = true;

  # https://devenv.sh/packages/
  packages = [ pkgs.jq pkgs.watchman pkgs.tmux pkgs.bun pkgs.postgresql pkgs.eas-cli ];

  services.postgres = {
    enable = true;
    package = pkgs-unstable.postgresql_18;

    listen_addresses = "127.0.0.1";
    port = env.POSTGRES_PORT;

    initialScript = ''
      -- Create role if it doesn't exist, or update password if it does
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${env.POSTGRES_USER}') THEN
          CREATE ROLE "${env.POSTGRES_USER}" WITH SUPERUSER LOGIN PASSWORD '${env.POSTGRES_PASSWORD}';
        ELSE
          ALTER ROLE "${env.POSTGRES_USER}" WITH SUPERUSER LOGIN PASSWORD '${env.POSTGRES_PASSWORD}';
        END IF;
      END
      $$;

      -- Set database owner
      ALTER DATABASE "${env.POSTGRES_DB}" OWNER TO "${env.POSTGRES_USER}";

      \c "${env.POSTGRES_DB}";
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    '';

    initialDatabases = [
      {
        name = env.POSTGRES_DB;
        # user = "postgres";
        # pass = "postgres";
      }
    ];
  };

  tasks = {
    # Reset Postgres state (wipe PGDATA)
    "db:reset" = {
      description = "Reset PostgreSQL data directory";
      exec = ''
        set -o errexit
        echo "Deleting PostgreSQL data in ''${PGDATA}"
        [[ -e "''${PGDATA}" ]] && rm -rf "''${PGDATA}"
      '';
    };

    "db:setup" = {
      description = "Run migrations and seed";
      exec = ''
        export PGHOST=127.0.0.1
        export PGPORT=${toString env.POSTGRES_PORT}
        export PGUSER=${env.POSTGRES_USER}
        export PGPASSWORD=${env.POSTGRES_PASSWORD}
        export PGDATABASE=${env.POSTGRES_DB}

        for f in backend/supabase/migrations/*.sql; do
          echo "Applying $f"
          psql -f "$f"
        done

        echo "Applying seed.sql"
        psql -f backend/supabase/seed.sql
      '';
    };

  };

  android = {
    enable = true;
    reactNative.enable = true;
    ndk.enable = true;
    platforms.version = [ "36" ];
    buildTools.version = [ "36.0.0" ];
    ndk.version = [ "27.1.12297006" ];
  };

  # https://devenv.sh/languages/
  languages = {
    # go.enable = true;
    javascript.pnpm.enable = true;
    javascript.enable = true;
  };

  # enterShell = ''
  #   supabase --version
  # '';

  # See full reference at https://devenv.sh/reference/options/
}
