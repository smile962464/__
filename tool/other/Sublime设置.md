# 设置

gbk 中文编码显示乱码问题：

先安装 Package Control ，再 
Control + Shift + P ＝> Install Package => ConvertToUTF8 

-----

```js
// Preferences - Settings 整体设置
// 文件：~/Library/Application Support/Sublime Text 3/Packages/User/Preferences.sublime-settings
{
  "auto_complete": true,
  "auto_complete_commit_on_tab": true,
  "auto_complete_selector": "source, text",
  "auto_complete_triggers":
  [
    {
      "characters": "<",
      "selector": "text.html"
    },
    {
      "characters": ".",
      "selector": "source, text.html"
    }
  ],
  "tab_size": 2,
  "translate_tabs_to_spaces": true,
  "color_scheme": "Packages/Color Scheme - Default/IDLE.tmTheme",
  "font_size": 12,
  "ignored_packages":
  [
    "Markdown",
    "Vintage"
  ],
  "indent_to_bracket": false,
  "open_files_in_new_window": false,
  "show_full_path": true,
  "show_panel_on_build": false,
  "translate_tabs_to_spaces": true
}

// Preferences - Key Bindings 快捷键设置
// 文件：~/Library/Application Support/Sublime Text 3/Packages/User/Default (OSX).sublime-keymap
[
    { "keys": ["super+shift+d"], "command": "expand_selection", "args": {"to": "line"} },
    { "keys": ["super+l"], "command": "find_under_expand" },
    { "keys": ["super+d"], "command": "duplicate_line" },
    { "keys": ["super+k"], "command": "toggle_side_bar" },
    
    { "keys": ["super+alt+f"], "command": "show_overlay", "args": {"overlay": "goto", "text": "@"} },
    { "keys": ["super+r"], "command": "show_panel", "args": {"panel": "replace", "reverse": false} },

    { "keys": ["alt+space"], "command": "auto_complete" },
    { "keys": ["alt+space"], "command": "replace_completion_with_auto_complete", "context":
        [
            { "key": "last_command", "operator": "equal", "operand": "insert_best_completion" },
            { "key": "auto_complete_visible", "operator": "equal", "operand": false },
            { "key": "setting.tab_completion", "operator": "equal", "operand": true }
        ]
    }
]

```

