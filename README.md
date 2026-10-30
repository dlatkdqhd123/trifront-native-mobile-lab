# TRI-FRONT mobile native lab

Isolated offline test build. https://dlatkdqhd123.github.io/trifront-native-mobile-lab/

Source branch: perf/native-actor-batch, source commit 1c92d03be6137b628fe92cbf9116a868df72f809.
Godot 4.7.2 / Emscripten 4.0.11 / wasm32 single thread. Select C++ or GDScript on the page; exported assets only.

Mobile physical-device FPS and iOS Safari validation are pending. Results stay in browser local storage and can be downloaded as JSON.

Build hashes and toolchain receipt: build.json.

## Web build download

[Download the verified Web ZIP (64 MiB)](https://github.com/dlatkdqhd123/trifront-native-mobile-lab/releases/download/native-web-2026.10.30-6bd2e16b/trifront-native-mobile-web-6bd2e16b.zip)

[Release notes, SHA256 checksums and build receipt](https://github.com/dlatkdqhd123/trifront-native-mobile-lab/releases/tag/native-web-2026.10.30-6bd2e16b)

This is a Web export for HTTPS hosting, not an Android APK. On a phone, use the live Pages URL above. Opening extracted HTML as a local file will not run the game.

## Mobile loading update

[Start the optimized C++ practice build](https://dlatkdqhd123.github.io/trifront-native-mobile-lab/play-fast/?mode=cpp&stress=0&map=map.canyon_loop)

Gameplay pack: 58.2 MB -> 21.5 MB; preserved current gameplay art/SFX. Versioned pack and separate PWA scope. The older play URL redirects here with the chosen mode/map. Source ebadc3882561eefaa559bb155a7bcfaf1121e29f.

Desktop throttled ABBA (2 MiB/s +40 ms): 37.1 -> 19.3 seconds; warm revisit 3.7 seconds. Not physical-phone timing. The earlier Release ZIP stays archived; the live site uses this newer build.

## Shadow batch API2

Field/frame shadow geometry and full MultiMesh buffers are computed in one C++ call; GDScript retains masks and resource ownership. Inactive cached groups can be reused without losing shadows. PCK and native library use content-hashed filenames to keep ABI versions together. Source aecc637fba0fb96b7c3c34dd51cb7c80e83bc6d6. Windows and Web share 18,571 actor checks plus 3,857 shadow buffer checks. Physical-phone FPS remains pending.

## Field query API1

The C++ mode also batches integer density selection across candidate monsters. Each authoritative field owns independent scratch memory; spawn/state/damage/event ordering remains in GDScript. The default production server is unchanged. Source 534678e46920c59af92d750cc2124fface632fe1.

Windows release combined C++ comparison reduced mean frame time by 3.7-6.2% across the three dense diagnostic maps, with similar process RSS. This includes actor/shadow/query paths and is not a phone FPS result or a density-query-only gain. Physical-phone validation and full monster-state migration remain pending.

## Latest main v0.436 refresh

Upstream ba5cfab2b67cc6b0c7268be7f99ef1bec6db92db, integrated source 58f20453510f3581f08d91e39069ebfc1b7fc950. Includes storm totem/T5, larger animated allied beasts, wave previews and resistance labels, forest passage and updated gear text. Actor ABI3 preserves current authored beast gait/flight and foreground ordering; field ABI1 is unchanged. Runtime gameplay capability434 is checked in the browser.

This update has fresh correctness/build verification; previous desktop performance figures do not measure the new v0.436 content. Physical phone verification is pending.

## Final v0.438 refresh

Integrated committed local main fd29cd686d2fb432188f7e1f4d0d464572fd509d (v0.437/v0.438 included), source 1c92d03be6137b628fe92cbf9116a868df72f809. Adds top wave-card readability/forest canopy clipping and guaranteed T1 economic mercenary specials. Runtime gameplay capability438 matches the recorded source capability. Full regression979/232379, Python106, bots5 and alpha replays20 passed; final local Web103 passed. Prior v0.436 deployment is an intermediate refresh.
