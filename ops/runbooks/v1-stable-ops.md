# topscience v1.0.0-p0-stable Ops

## Services
- Web: systemd unit `topscience-web`
- CMS: docker compose service `cms`

## Health checks
- Web: `curl -I http://127.0.0.1:3000`
- CMS: `curl -s http://127.0.0.1:8055/server/health`
- Smoke: `/opt/topscience/ops/scripts/web-cms-smoke.sh`
- Monitor: `/opt/topscience/ops/scripts/web-cms-monitor.sh`

## Web service control
- `sudo systemctl status topscience-web --no-pager`
- `sudo systemctl restart topscience-web`
- `sudo journalctl -u topscience-web -n 100 --no-pager`

## CMS control
- `docker compose --env-file infra/docker/.env.staging -f infra/docker/docker-compose.staging.yml up -d cms`
- `docker logs --tail 100 docker-cms-1`

## Scheduled monitoring
- Cron: `*/15 * * * * /opt/topscience/ops/scripts/web-cms-monitor.sh >> /var/log/web-cms-monitor.log 2>&1`
