(function () {
  "use strict";

  var RIGHT_HYPER = ["right_command", "right_control", "right_shift", "right_option"];
  var LEFT_MODIFIERS = ["left_command", "left_option", "left_control", "left_shift"];
  var MODIFIER_GLYPHS = ["⌘", "⌥", "⌃", "⇧"];
  var KEY_UNIT = 50;
  var KEY_GAP = 5;

  function K(code, label, width, modifierBit, hyperModifier, alwaysHeld) {
    return {
      code: code,
      label: label,
      width: width || 1,
      modifierBit: typeof modifierBit === "number" ? modifierBit : null,
      hyperModifier: Boolean(hyperModifier),
      alwaysHeld: Boolean(alwaysHeld)
    };
  }

  function S(width) {
    return { spacer: true, width: width || 1 };
  }

  function G(span, keys) {
    return { span: span, keys: keys };
  }

  var LAYOUT = [
    {
      kind: "function",
      groups: [
        G(1, [K("escape", "esc")]),
        G(4, [K("f1", "F1"), K("f2", "F2"), K("f3", "F3"), K("f4", "F4")]),
        G(4, [K("f5", "F5"), K("f6", "F6"), K("f7", "F7"), K("f8", "F8")]),
        G(4, [K("f9", "F9"), K("f10", "F10"), K("f11", "F11"), K("f12", "F12")]),
        G(3, [K("f13", "F13"), K("f14", "F14"), K("f15", "F15")])
      ]
    },
    {
      groups: [
        G(15, [
          K("grave_accent_and_tilde", "\u0060"),
          K("1", "1"), K("2", "2"), K("3", "3"), K("4", "4"), K("5", "5"),
          K("6", "6"), K("7", "7"), K("8", "8"), K("9", "9"), K("0", "0"),
          K("hyphen", "−"), K("equal_sign", "="), K("delete_or_backspace", "delete", 2)
        ]),
        G(3, [K("insert", "ins"), K("home", "home"), K("page_up", "pgup")]),
        G(4, [
          K("keypad_num_lock", "clear"), K("keypad_equal_sign", "="),
          K("keypad_slash", "/"), K("keypad_asterisk", "×")
        ])
      ]
    },
    {
      groups: [
        G(15, [
          K("tab", "tab", 1.5),
          K("q", "Q"), K("w", "W"), K("e", "E"), K("r", "R"), K("t", "T"),
          K("y", "Y"), K("u", "U"), K("i", "I"), K("o", "O"), K("p", "P"),
          K("open_bracket", "["), K("close_bracket", "]"), K("backslash", "\\", 1.5)
        ]),
        G(3, [K("delete_forward", "del"), K("end", "end"), K("page_down", "pgdn")]),
        G(4, [
          K("keypad_7", "7"), K("keypad_8", "8"), K("keypad_9", "9"), K("keypad_hyphen", "−")
        ])
      ]
    },
    {
      groups: [
        G(15, [
          K("caps_lock", "caps", 1.75, null, false, true),
          K("a", "A"), K("s", "S"), K("d", "D"), K("f", "F"), K("g", "G"),
          K("h", "H"), K("j", "J"), K("k", "K"), K("l", "L"),
          K("semicolon", ";"), K("quote", "'"), K("return_or_enter", "return", 2.25)
        ]),
        G(3, [S(3)]),
        G(4, [
          K("keypad_4", "4"), K("keypad_5", "5"), K("keypad_6", "6"), K("keypad_plus", "+")
        ])
      ]
    },
    {
      groups: [
        G(15, [
          K("left_shift", "shift", 2.25, 3),
          K("z", "Z"), K("x", "X"), K("c", "C"), K("v", "V"), K("b", "B"),
          K("n", "N"), K("m", "M"), K("comma", ","), K("period", "."), K("slash", "/"),
          K("right_shift", "shift", 2.75, null, true)
        ]),
        G(3, [S(1), K("up_arrow", "↑"), S(1)]),
        G(4, [
          K("keypad_1", "1"), K("keypad_2", "2"), K("keypad_3", "3"), K("keypad_enter", "enter")
        ])
      ]
    },
    {
      groups: [
        G(15, [
          K("fn", "fn"),
          K("left_control", "control", 1.25, 2),
          K("left_option", "option", 1.25, 1),
          K("left_command", "⌘", 1.5, 0),
          K("spacebar", "space", 5),
          K("right_command", "⌘", 1.5, null, true),
          K("right_option", "option", 1.25, null, true),
          K("right_control", "control", 1.25, null, true),
          S(1)
        ]),
        G(3, [K("left_arrow", "←"), K("down_arrow", "↓"), K("right_arrow", "→")]),
        G(4, [K("keypad_0", "0", 2), K("keypad_period", "."), S(1)])
      ]
    }
  ];

  var TEXT = {
    en: {
      plane: "Plane",
      hyper: "Hyper",
      mappings: "mappings",
      noMapping: "No mapping",
      noMappingPlane: "This key has no mapping in the selected control plane.",
      noRule: "No rule",
      none: "None",
      basic: "Basic",
      navigation: "Navigation",
      deletion: "Deletion",
      mousekey: "MouseKey",
      window: "Window",
      application: "Application",
      terminal: "Terminal",
      clipboard: "Clipboard",
      shifter: "Shifter",
      functional: "Functional",
      configError: "The embedded Karabiner configuration could not be parsed.",
      copied: "Configuration JSON copied to the clipboard.",
      copyFailed: "Clipboard access failed. Use Download config instead.",
      reset: "All in-page edits were reset.",
      resetConfirm: "Discard all in-page edits?",
      saved: "Application shortcut updated:",
      invalidApp: "Enter a valid application name without control characters.",
      exported: "Customized Karabiner JSON downloaded.",
      defaultStatus: "Edits stay in this page until you download the JSON and import it into Karabiner-Elements.",
      held: "Held",
      leftModifier: "Left",
      rightHyper: "Right Hyper modifier",
      tap: "Tap",
      hold: "Hold",
      shell: "Shell"
    },
    zh: {
      plane: "控制平面",
      hyper: "Hyper",
      mappings: "个映射",
      noMapping: "未映射",
      noMappingPlane: "该按键在当前控制平面中没有映射。",
      noRule: "无规则",
      none: "无",
      basic: "基础",
      navigation: "导航",
      deletion: "删除",
      mousekey: "鼠标",
      window: "窗口",
      application: "应用",
      terminal: "终端",
      clipboard: "剪贴板",
      shifter: "上档",
      functional: "功能",
      configError: "无法解析页面内嵌的 Karabiner 配置。",
      copied: "配置 JSON 已复制到剪贴板。",
      copyFailed: "无法访问剪贴板，请改用“下载配置”。",
      reset: "已重置页面内的全部修改。",
      resetConfirm: "放弃页面内的全部修改吗？",
      saved: "应用快捷键已更新：",
      invalidApp: "请输入不含控制字符的有效应用名称。",
      exported: "已下载定制后的 Karabiner JSON。",
      defaultStatus: "所有编辑仅保存在当前页面；请下载 JSON 后导入 Karabiner-Elements。",
      held: "按下",
      leftModifier: "左侧",
      rightHyper: "右侧 Hyper 修饰键",
      tap: "单击",
      hold: "按住",
      shell: "命令"
    }
  };

  var OUTPUT_KEY_LABELS = {
    escape: "Escape",
    caps_lock: "Caps Lock",
    spacebar: "Space",
    return_or_enter: "Return",
    delete_or_backspace: "Delete",
    delete_forward: "Forward Delete",
    left_arrow: "←",
    right_arrow: "→",
    up_arrow: "↑",
    down_arrow: "↓",
    page_up: "Page Up",
    page_down: "Page Down",
    grave_accent_and_tilde: "\u0060",
    open_bracket: "[",
    close_bracket: "]",
    equal_sign: "=",
    hyphen: "−",
    semicolon: ";",
    quote: "'",
    comma: ",",
    period: ".",
    slash: "/",
    backslash: "\\",
    vk_none: "none"
  };

  var OUTPUT_MODIFIER_LABELS = {
    left_command: "⌘",
    right_command: "⌘",
    command: "⌘",
    left_option: "⌥",
    right_option: "⌥",
    option: "⌥",
    left_control: "⌃",
    right_control: "⌃",
    control: "⌃",
    left_shift: "⇧",
    right_shift: "⇧",
    shift: "⇧",
    fn: "fn"
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function widthForUnits(units) {
    return Math.round((units * KEY_UNIT) + ((units - 1) * KEY_GAP));
  }

  function indexKey(code, mask) {
    return code + "::" + mask;
  }

  function hasHyper(mandatory) {
    return RIGHT_HYPER.every(function (modifier) {
      return mandatory.indexOf(modifier) !== -1;
    });
  }

  function maskFromMandatory(mandatory) {
    return LEFT_MODIFIERS.reduce(function (mask, modifier, bit) {
      return mandatory.indexOf(modifier) === -1 ? mask : mask | (1 << bit);
    }, 0);
  }

  function categoryFromRule(ruleName) {
    var normalized = String(ruleName || "").toLowerCase();
    if (normalized.indexOf("navigation") !== -1) return "navigation";
    if (normalized.indexOf("deletion") !== -1) return "deletion";
    if (normalized.indexOf("mousekey") !== -1) return "mousekey";
    if (normalized.indexOf("window") !== -1) return "window";
    if (normalized.indexOf("application") !== -1) return "application";
    if (normalized.indexOf("terminal") !== -1) return "terminal";
    if (normalized.indexOf("clipboard") !== -1) return "clipboard";
    if (normalized.indexOf("shifter") !== -1) return "shifter";
    if (normalized.indexOf("functional") !== -1) return "functional";
    return "basic";
  }

  function buildIndex(config) {
    var byKey = new Map();
    var counts = new Array(16).fill(0);
    (config.rules || []).forEach(function (rule, ruleIndex) {
      (rule.manipulators || []).forEach(function (mapping, mappingIndex) {
        var from = mapping.from || {};
        var code = from.key_code;
        if (!code) return;
        var mandatory = (((from.modifiers || {}).mandatory) || []);
        var isCapsBase = code === "caps_lock" && mapping.to_if_alone && !hasHyper(mandatory);
        if (!isCapsBase && !hasHyper(mandatory)) return;
        var mask = isCapsBase ? 0 : maskFromMandatory(mandatory);
        var item = {
          id: ruleIndex + ":" + mappingIndex,
          code: code,
          mask: mask,
          mapping: mapping,
          ruleName: rule.description || "",
          category: categoryFromRule(rule.description),
          isCapsBase: isCapsBase
        };
        byKey.set(indexKey(code, mask), item);
      });
    });
    byKey.forEach(function (item) {
      counts[item.mask] += 1;
    });
    return { byKey: byKey, counts: counts };
  }

  function modifierTitle(mask, language) {
    var parts = [TEXT[language].hyper];
    MODIFIER_GLYPHS.forEach(function (glyph, bit) {
      if (mask & (1 << bit)) parts.push(glyph);
    });
    return parts.join(" + ");
  }

  function parseOpenApplication(command) {
    var match = String(command || "").trim().match(/^open\s+-a\s+(.+)$/);
    if (!match) return null;
    var value = match[1].trim();
    if (value.length >= 2 && value.charAt(0) === "'" && value.charAt(value.length - 1) === "'") {
      return value.slice(1, -1);
    }
    if (value.length >= 2 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
      var unquoted = value.slice(1, -1)
        .replace(/\\(["\\$])/g, "$1");
      var tick = String.fromCharCode(96);
      return unquoted.split("\\" + tick).join(tick);
    }
    return value;
  }

  function appTarget(item) {
    var outputs = item && item.mapping && item.mapping.to;
    if (!Array.isArray(outputs)) return null;
    for (var index = 0; index < outputs.length; index += 1) {
      if (outputs[index].shell_command) {
        var name = parseOpenApplication(outputs[index].shell_command);
        if (name) return { index: index, name: name };
      }
    }
    return null;
  }

  function shellDoubleQuote(value) {
    var tick = String.fromCharCode(96);
    var escaped = value
      .replace(/\\/g, "\\\\")
      .replace(/"/g, "\\\"")
      .replace(/\$/g, "\\$");
    escaped = escaped.split(tick).join("\\" + tick);
    return '"' + escaped + '"';
  }

  function humanKey(code) {
    if (OUTPUT_KEY_LABELS[code]) return OUTPUT_KEY_LABELS[code];
    if (/^f\d+$/.test(code)) return code.toUpperCase();
    if (/^keypad_/.test(code)) return "Keypad " + code.slice(7).replace(/_/g, " ");
    return String(code || "").replace(/_/g, " ");
  }

  function outputModifier(modifier) {
    return OUTPUT_MODIFIER_LABELS[modifier] || humanKey(modifier);
  }

  function describeOutputEntry(entry, language) {
    if (entry.shell_command) {
      var app = parseOpenApplication(entry.shell_command);
      return app ? "open -a → " + app : TEXT[language].shell + ": " + entry.shell_command;
    }
    if (entry.key_code) {
      var modifiers = (entry.modifiers || []).map(outputModifier);
      modifiers.push(humanKey(entry.key_code));
      return modifiers.join(" ");
    }
    if (entry.consumer_key_code) return humanKey(entry.consumer_key_code);
    if (entry.apple_vendor_keyboard_key_code) return humanKey(entry.apple_vendor_keyboard_key_code);
    if (entry.pointing_button) return humanKey(entry.pointing_button);
    if (entry.mouse_key) {
      return Object.keys(entry.mouse_key).map(function (key) {
        return humanKey(key) + " " + entry.mouse_key[key];
      }).join(", ");
    }
    return JSON.stringify(entry);
  }

  function describeOutput(item, language) {
    if (!item) return TEXT[language].noMappingPlane;
    if (item.isCapsBase) {
      var tap = (item.mapping.to_if_alone || []).map(function (entry) {
        return describeOutputEntry(entry, language);
      }).join(" → ");
      return TEXT[language].tap + " → " + tap + " · " + TEXT[language].hold + " → Hyper";
    }
    var outputs = item.mapping.to || [];
    return outputs.map(function (entry) {
      return describeOutputEntry(entry, language);
    }).join(" → ");
  }

  function descriptionAction(description) {
    var text = String(description || "");
    var separator = text.indexOf(" = ");
    return separator === -1 ? text : text.slice(separator + 3);
  }

  function shortAction(item) {
    if (!item) return "";
    if (item.isCapsBase) return "Esc / Hyper";
    var app = appTarget(item);
    if (app) return app.name;
    return descriptionAction(item.mapping.description || item.ruleName)
      .replace(/capslock/gi, "Caps Lock")
      .replace(/equal_sign/g, "=")
      .replace(/left_/g, "")
      .replace(/_/g, " ");
  }

  function findKeyMeta(code) {
    var found = null;
    LAYOUT.some(function (row) {
      return row.groups.some(function (group) {
        return group.keys.some(function (key) {
          if (!key.spacer && key.code === code) {
            found = key;
            return true;
          }
          return false;
        });
      });
    });
    return found || K(code, humanKey(code));
  }

  function init(root) {
    var language = root.dataset.lang === "zh" ? "zh" : "en";
    var t = TEXT[language];
    var source = root.querySelector("[data-capslock-config]");
    var baseline;
    try {
      baseline = JSON.parse(source.textContent);
    } catch (error) {
      root.innerHTML = '<p class="cc-raw-action">' + t.configError + "</p>";
      return;
    }

    var config = clone(baseline);
    var selectedMask = 0;
    var selectedKey = "caps_lock";
    var edited = new Set();
    var mappingIndex = buildIndex(config);
    var keyButtons = new Map();
    var planeButtons = [];

    var elements = {
      keyboard: root.querySelector("[data-keyboard]"),
      planeTitle: root.querySelector("[data-plane-title]"),
      planeNumber: root.querySelector("[data-plane-number]"),
      mappingCount: root.querySelector("[data-mapping-count]"),
      editCount: root.querySelector("[data-edit-count]"),
      planeTable: root.querySelector("[data-plane-table]"),
      detailSymbol: root.querySelector("[data-detail-symbol]"),
      detailKey: root.querySelector("[data-detail-key]"),
      detailRule: root.querySelector("[data-detail-rule]"),
      detailAction: root.querySelector("[data-detail-action]"),
      detailCategory: root.querySelector("[data-detail-category]"),
      detailOutput: root.querySelector("[data-detail-output]"),
      appEditor: root.querySelector("[data-app-editor]"),
      appName: root.querySelector("[data-app-name]"),
      status: root.querySelector("[data-status]"),
      exportButton: root.querySelector("[data-export-config]"),
      copyButton: root.querySelector("[data-copy-config]"),
      resetButton: root.querySelector("[data-reset-config]")
    };

    function setStatus(message) {
      elements.status.textContent = message;
    }

    function selectPlane(mask) {
      selectedMask = Number(mask) & 15;
      render();
    }

    function toggleModifier(bit) {
      selectedMask = selectedMask ^ (1 << bit);
      render();
    }

    function buildKeyboard() {
      LAYOUT.forEach(function (row) {
        var rowElement = document.createElement("div");
        rowElement.className = "cc-key-row" + (row.kind === "function" ? " cc-key-row-function" : "");

        row.groups.forEach(function (group) {
          var groupElement = document.createElement("div");
          groupElement.className = "cc-key-group";
          groupElement.style.width = widthForUnits(group.span) + "px";

          group.keys.forEach(function (key) {
            var keyWidth = widthForUnits(key.width);
            if (key.spacer) {
              var spacer = document.createElement("span");
              spacer.style.width = keyWidth + "px";
              spacer.setAttribute("aria-hidden", "true");
              groupElement.appendChild(spacer);
              return;
            }

            var button = document.createElement("button");
            var symbol = document.createElement("span");
            var action = document.createElement("span");
            button.type = "button";
            button.className = "cc-key" + (key.modifierBit !== null || key.hyperModifier ? " is-modifier" : "");
            button.style.width = keyWidth + "px";
            button.dataset.keyCode = key.code;
            symbol.className = "cc-key-symbol";
            symbol.textContent = key.label;
            action.className = "cc-key-action";
            button.appendChild(symbol);
            button.appendChild(action);

            if (key.modifierBit !== null) {
              button.dataset.modifierBit = String(key.modifierBit);
              button.setAttribute("aria-pressed", "false");
              button.addEventListener("click", function () {
                toggleModifier(key.modifierBit);
              });
            } else if (key.hyperModifier) {
              button.dataset.hyperModifier = "true";
              button.setAttribute("aria-pressed", "true");
            } else {
              button.addEventListener("click", function () {
                selectedKey = key.code;
                render();
              });
            }

            button.addEventListener("pointerdown", function () {
              button.classList.add("is-pressed");
            });
            ["pointerup", "pointercancel", "pointerleave"].forEach(function (eventName) {
              button.addEventListener(eventName, function () {
                button.classList.remove("is-pressed");
              });
            });

            keyButtons.set(key.code, { button: button, action: action, meta: key });
            groupElement.appendChild(button);
          });
          rowElement.appendChild(groupElement);
        });
        elements.keyboard.appendChild(rowElement);
      });
    }

    function buildPlaneTable() {
      for (var plane = 0; plane < 16; plane += 1) {
        var button = document.createElement("button");
        var numberCell = document.createElement("strong");
        var modifierCells = [];
        var countCell = document.createElement("span");
        button.type = "button";
        button.className = "cc-plane-row";
        button.dataset.plane = String(plane);
        button.setAttribute("aria-pressed", "false");
        numberCell.textContent = String(plane);
        button.appendChild(numberCell);
        for (var bit = 0; bit < 4; bit += 1) {
          var modifierCell = document.createElement("span");
          var isHeld = Boolean(plane & (1 << bit));
          modifierCell.className = "cc-plane-modifier" + (isHeld ? " is-on" : "");
          modifierCell.textContent = isHeld ? "●" : "·";
          modifierCell.setAttribute("aria-hidden", "true");
          modifierCells.push(modifierCell);
          button.appendChild(modifierCell);
        }
        countCell.className = "cc-plane-map-count";
        button.appendChild(countCell);
        button.addEventListener("click", function (event) {
          selectPlane(Number(event.currentTarget.dataset.plane));
        });
        planeButtons.push({ button: button, modifierCells: modifierCells, countCell: countCell });
        elements.planeTable.appendChild(button);
      }
    }

    function renderKeyboard() {
      keyButtons.forEach(function (record, code) {
        var isHyperModifier = record.button.dataset.hyperModifier === "true";
        var modifierBit = record.button.dataset.modifierBit;
        if (isHyperModifier) {
          record.button.setAttribute("aria-pressed", "true");
          record.button.classList.add("is-held");
          record.button.classList.toggle("is-selected", false);
          record.button.classList.toggle("is-unmapped", false);
          record.action.textContent = "Hyper";
          record.button.title = t.rightHyper + " · " + t.held;
          record.button.setAttribute("aria-label", record.meta.label + " — " + t.rightHyper + ", " + t.held);
          return;
        }
        if (typeof modifierBit !== "undefined") {
          var modifierActive = Boolean(selectedMask & (1 << Number(modifierBit)));
          record.button.setAttribute("aria-pressed", String(modifierActive));
          record.button.classList.toggle("is-held", modifierActive);
          record.button.classList.toggle("is-selected", false);
          record.button.classList.toggle("is-unmapped", false);
          record.action.textContent = modifierActive ? t.held : t.leftModifier;
          record.button.title = t.leftModifier + " · " + (modifierActive ? t.held : modifierTitle(selectedMask, language));
          record.button.setAttribute(
            "aria-label",
            record.meta.label + " — " + t.leftModifier + ", " + (modifierActive ? t.held : t.noMapping)
          );
          return;
        }

        var item = mappingIndex.byKey.get(indexKey(code, selectedMask));
        var action = shortAction(item);
        record.button.classList.toggle("is-held", Boolean(record.meta.alwaysHeld));
        if (record.meta.alwaysHeld) {
          record.button.setAttribute("aria-pressed", "true");
        } else {
          record.button.removeAttribute("aria-pressed");
        }
        record.action.textContent = action || "—";
        record.button.title = (action || t.noMapping) + " · " + modifierTitle(selectedMask, language);
        record.button.classList.toggle("is-unmapped", !item);
        record.button.classList.toggle("is-selected", selectedKey === code);
        if (item) {
          record.button.dataset.category = item.category;
        } else {
          delete record.button.dataset.category;
        }
        record.button.setAttribute(
          "aria-label",
          record.meta.label + " — " + (action || t.noMapping) + ", " + modifierTitle(selectedMask, language)
        );
      });
    }

    function renderControls() {
      elements.planeTitle.textContent = modifierTitle(selectedMask, language);
      elements.planeNumber.textContent = selectedMask;
      elements.mappingCount.textContent = mappingIndex.counts[selectedMask];
      elements.editCount.textContent = edited.size;

      planeButtons.forEach(function (record, plane) {
        var count = mappingIndex.counts[plane];
        record.button.setAttribute("aria-pressed", String(plane === selectedMask));
        record.button.dataset.empty = String(count === 0);
        record.countCell.textContent = String(count);
        record.button.setAttribute(
          "aria-label",
          t.plane + " " + plane + ": " + modifierTitle(plane, language) + ", " + count + " " + t.mappings
        );
      });
    }

    function renderDetail() {
      var meta = findKeyMeta(selectedKey);
      var item = mappingIndex.byKey.get(indexKey(selectedKey, selectedMask));
      elements.detailSymbol.textContent = meta.label;
      elements.detailKey.textContent = selectedKey;

      if (!item) {
        elements.detailRule.textContent = t.noRule;
        elements.detailAction.textContent = t.noMapping;
        elements.detailCategory.textContent = t.none;
        elements.detailOutput.textContent = t.noMappingPlane;
        elements.appEditor.hidden = true;
        return;
      }

      elements.detailRule.textContent = item.ruleName;
      elements.detailAction.textContent = shortAction(item);
      elements.detailCategory.textContent = t[item.category] || item.category;
      elements.detailOutput.textContent = describeOutput(item, language);
      var target = appTarget(item);
      elements.appEditor.hidden = !target;
      if (target) {
        elements.appName.value = target.name;
        elements.appEditor.dataset.mappingId = item.id;
      }
    }

    function render() {
      renderControls();
      renderKeyboard();
      renderDetail();
    }

    elements.appEditor.addEventListener("submit", function (event) {
      event.preventDefault();
      var item = mappingIndex.byKey.get(indexKey(selectedKey, selectedMask));
      var target = appTarget(item);
      var value = elements.appName.value.trim();
      if (!item || !target || !value || /[\u0000-\u001f\u007f]/.test(value)) {
        setStatus(t.invalidApp);
        return;
      }

      item.mapping.to[target.index].shell_command = "open -a " + shellDoubleQuote(value);
      var description = String(item.mapping.description || "");
      var separator = description.indexOf(" = ");
      if (separator !== -1) {
        item.mapping.description = description.slice(0, separator + 3) + value;
      }
      edited.add(item.id);
      mappingIndex = buildIndex(config);
      render();
      setStatus(t.saved + " " + value);
    });

    elements.exportButton.addEventListener("click", function () {
      var data = JSON.stringify(config, null, 2) + "\n";
      var blob = new Blob([data], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      var version = String(config.version || "v3").replace(/[^a-zA-Z0-9._-]/g, "-");
      link.href = url;
      link.download = "capslock-" + version + "-custom.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 0);
      setStatus(t.exported);
    });

    elements.copyButton.addEventListener("click", function () {
      var data = JSON.stringify(config, null, 2) + "\n";
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        setStatus(t.copyFailed);
        return;
      }
      navigator.clipboard.writeText(data).then(function () {
        setStatus(t.copied);
      }).catch(function () {
        setStatus(t.copyFailed);
      });
    });

    elements.resetButton.addEventListener("click", function () {
      if (edited.size > 0 && !window.confirm(t.resetConfirm)) return;
      config = clone(baseline);
      edited.clear();
      mappingIndex = buildIndex(config);
      render();
      setStatus(t.reset);
    });

    buildKeyboard();
    buildPlaneTable();
    render();
    setStatus(t.defaultStatus);
  }

  document.querySelectorAll("[data-capslock-configurator]").forEach(init);
}());
