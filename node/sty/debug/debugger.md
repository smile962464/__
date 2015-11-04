# Node Built-in Debugger

> http://nodejs.org/api/debugger.html
> 类似 GDB

## 例子

```javascript
  var path = url.parse(req.url).pathname;

  debugger;

  res.writeHead(200, { 'Content-Type': 'text/plain' });

```

```bash
node debug server.js
``` 

## 使用 `help` 获取调试命令列表

```
Commands: run (r), cont (c), next (n), step (s), out (o), backtrace (bt), setBreakpoint (sb), clearBreakpoint (cb),
watch, unwatch, watchers, repl, restart, kill, list, scripts, breakOnException, breakpoints, version
```

- cont, c - Continue execution
- next, n - Step next
- step, s - Step in
- out, o - Step out
- pause - Pause running code (like pause button in Developer Tools)
- setBreakpoint(), sb() - Set breakpoint on current line
- setBreakpoint(line), sb(line) - Set breakpoint on specific line
- setBreakpoint('fn()'), sb(...) - Set breakpoint on a first statement in functions body
- setBreakpoint('script.js', 1), sb(...) - Set breakpoint on first line of script.js
- clearBreakpoint, cb(...) - Clear breakpoint
- backtrace, bt - Print backtrace of current execution frame
- list(5) - List scripts source code with 5 line context (5 lines - before and after)
- watch(expr) - Add expression to watch list
- unwatch(expr) - Remove expression from watch list
- watchers - List all watchers and their values (automatically listed on each breakpoint)
- repl - Open debugger's repl for evaluation in debugging script's context, read-eval-print-loop
- run - Run script (automatically runs on debugger's start)
- restart - Restart script
- kill - Kill script
- scripts - List all loaded scripts
- version - Display v8's version
