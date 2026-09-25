#!/usr/bin/env bash

# client_config format:
# username_format|email_domain|optional_email_local_format
#
# Example:
# fnli|imaginaryworks.org|fn.ln

client_config=${ESPANSO_CLIENT_CONFIG:?Missing client_config}

IFS='|' read -r username_format email_domain email_local_format <<EOF
$client_config
EOF

if [ -z "$username_format" ] || [ -z "$email_domain" ]; then
  printf 'client_config must include username_format and email_domain\n' >&2
  exit 1
fi

first=$(printf '%s' "$ESPANSO_FIRSTNAME" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//')
last=$(printf '%s' "$ESPANSO_LASTNAME" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//')

first_name=$(printf '%s' "$first" | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]')
last_name=$(printf '%s' "$last" | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]')

first_initial=$(printf '%s\n' "$first" | awk '{ for (i = 1; i <= NF; i++) printf "%s", tolower(substr($i, 1, 1)) }')
last_initial=$(printf '%s\n' "$last" | awk '{ for (i = 1; i <= NF; i++) printf "%s", tolower(substr($i, 1, 1)) }')

format_local_part() {
  case "$1" in
    fn)    printf '%s' "$first_name" ;;
    ln)    printf '%s' "$last_name" ;;
    fnln)  printf '%s%s' "$first_name" "$last_name" ;;
    fnli)  printf '%s%s' "$first_name" "$last_initial" ;;
    filn)  printf '%s%s' "$first_initial" "$last_name" ;;
    fili)  printf '%s%s' "$first_initial" "$last_initial" ;;
    fn.ln) printf '%s.%s' "$first_name" "$last_name" ;;
    fn.li) printf '%s.%s' "$first_name" "$last_initial" ;;
    fi.ln) printf '%s.%s' "$first_initial" "$last_name" ;;
    fi.li) printf '%s.%s' "$first_initial" "$last_initial" ;;
    *)
      printf 'Unsupported account format: %s\n' "$1" >&2
      exit 1
      ;;
  esac
}

username=$(format_local_part "$username_format")
email_format=${email_local_format:-$username_format}
email_local_part=$(format_local_part "$email_format")

printf '%s %s\nUsername: %s\nEmail: %s@%s' \
  "$first" \
  "$last" \
  "$username" \
  "$email_local_part" \
  "$email_domain"
