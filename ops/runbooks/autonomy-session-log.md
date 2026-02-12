
## 2026-02-11 19:03 CET — Gateway ownership/token mismatch loop
- Симптом: gateway повторно стартува како root, token mismatch/unauthorized.
- Потврда: ss/ps покажаа `openclaw-gateway` owner=root.
- Влијание: блокира директна автономна remote контрола.
- Следна акција: force stop root-owned gateway и clean start под aiops; verify owner + probe.

