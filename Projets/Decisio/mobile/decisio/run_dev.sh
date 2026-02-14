#!/usr/bin/env bash
set -euo pipefail

export SUPABASE_URL="https://mtfrlppprzrmnwldleti.supabase.co"
export SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10ZnJscHBwcnpybW53bGRsZXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwOTgwNzEsImV4cCI6MjA4MTY3NDA3MX0.XKRW-3xLvC2bfTx7xp5DjIBaRV7VUGxowmsDq7zZgLM"

flutter run -d linux -t lib/main.dart \
  --dart-define=SUPABASE_URL=$SUPABASE_URL \
  --dart-define=SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
