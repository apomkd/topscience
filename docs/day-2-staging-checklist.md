# Day 2 Staging Checklist
1. Copy repo to /opt/topscience on server.
2. Copy infra/docker/.env.staging.example to infra/docker/.env.staging and set strong secrets.
3. Run ops/scripts/staging-up.sh.
4. Verify:
   - web: http://SERVER_IP:3000
   - cms: http://SERVER_IP:8055
5. Optional: put 8055 behind reverse proxy and close public port.
