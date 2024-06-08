const translations = {
  tagline: 'The best Minecraft modpack for vanilla players',
  shareTagline: 'Someone shared with you this UnoPack Pack',
  changeLang: 'Change language',
  landing: {
    cards: [
      {
        title: 'Vanilla',
        text: 'We added only client-side mods that optimize the game without deviating from the vanilla experience',
      },
      {
        title: 'Modular',
        text: "Everyone has different tastes, so you can choose only exactly what modifications you need and what you don't need in this pack",
      },
      {
        title: 'Not only mods',
        text: 'We have included not only mods, but also resource packs, shaders and all the necessary settings - all for your convenience',
      },
    ],
    generateButton: 'Generate for',
    editButton: 'Edit for',
    shortDescrition:
      'With UnoPack you can quickly generate a vanilla-enchansing Minecraft modpack ideal for you',
  },
  packs: {
    default: {
      name: 'UnoPack Essential Mods',
      description: 'Performance boosting mods',
    },
    roleplay: {
      name: 'Roleplay pack',
      description:
        'Additional skin customization, emotes, proximity voice chat and more',
      imgAltText: 'A minecraft player T-Posing and using voice chat',
    },
    utility: {
      name: 'Utility mods',
      description: 'Mods that make boring things easier',
      imgAltText: 'Minecraft gears rotating',
    },
    contentcreator: {
      name: 'Content creator pack',
      description: 'Manipulate your camera to create cinematic shots',
      imgAltText: 'A minecraft character using a camera',
    },
    graphics: {
      name: 'Graphics pack',
      description: 'Make vanilla Minecraft beautiful',
      imgAltText: 'A minecraft tree with falling leaves',
    },
  },
  descriptions: {
    'better-stats':
      'A Minecraft mod that improves the statistics screen and makes it more useful',
    'boat-item-view': 'See your held items when in a moving boat!',
    'chat-heads': "See who you're chatting with!",
    'cit-resewn':
      "Re-implements MCPatcher's CIT (custom item textures from optifine resource packs)",
    'cloth-config': 'Configuration Library for Minecraft Mods',
    'c2me-fabric':
      'A mod designed to improve the chunk performance of Minecraft',
    cem: 'Custom Entity Models support on Fabric',
    dcch: 'Saves your chat history',
    deathlog: 'Keeps track of the many embarrassing times you died',
    e4mc: 'Open a LAN server to anyone, anywhere, anytime',
    moreculling:
      'Using async path-tracing to hide Block-/Entities that are not visible',
    'ferrite-core': 'Memory usage optimizations',
    horsestatsvanilla:
      'This client-side mod displays the statistics (health, speed, jump height) of horses in their inventory',
    immediatelyfast: 'Speed up immediate mode rendering in Minecraft',
    indium:
      'Sodium addon providing support for the Fabric Rendering API, based on Indigo',
    inspecio: 'A Minecraft mod which adds more tooltips',
    iris: 'A modern shaders mod for Minecraft intended to be compatible with existing OptiFine shader packs',
    krypton: 'A mod to optimize the Minecraft networking stack',
    languagereload: 'Reduces load times and adds fallbacks for languages',
    lithium: 'No-compromises game logic/server optimization mod',
    memoryleakfix:
      'A mod that fixes random memory leaks for both the client and server',
    modmenu: 'Adds a mod menu to view the list of mods you have installed',
    modelfix: 'Fixes gaps in Block Models and Item Models',
    notelemetry: 'Disable the telemetry introduced in 21w38a',
    okzoomer:
      'Adds a highly-configurable zoom key for Quilt. The zoom is yours!',
    owolib:
      'A general utility, GUI and config library for modding on Fabric and Quilt',
    qkl: "Quilt's official Kotlin libraries",
    qsl: 'The standard libraries of the Quilt ecosystem. Essential for your modding experience on Quilt!',
    reesessodiumoptions: 'Alternative Options Menu for Sodium',
    screenshottoclipboard: 'Screenshots taken are copied to the clipboard',
    sodium:
      'A modern rendering engine for Minecraft which greatly improves frame rates and micro-stutter, while fixing graphical issues',
    sodiumextra: "Features that shouldn't be in Sodium",
    starlight:
      'Rewrites the light engine to fix lighting performance and lighting errors',
    'status-effect-bars':
      'Adds customizable bars to the status effects overlay to show the remaining duration of effects',
    technomodel: 'Name any pig "Technoblade" to add his crown to its head',
    yacl: 'A builder-based configuration library for Minecraft',
    perspectivemodredux: '360 degree third person view',
    continuity: 'A mod that allows for efficient connected textures',
    rethinkingvoxels:
      'High quality, well optimized shader pack that aims for perfection',
    fallingleaves: 'Adds falling leaves to trees',
    betterleaves:
      'Makes the leaves bushy, while being compatible with other resourcepacks and mods',
    icons: 'Introduces icons throughout different aspects of the game',
    mousewheelie:
      'A "small" clientside mod featuring item scrolling, inventory sorting, item refilling and more!',
    lambdynamiclights: 'Adds light around you when holding a torch',
    xaerosworldmap:
      "Adds a full screen world map which shows you what you have explored in the world. Works great together with Xaero's Minimap",
    verymanyplayers:
      'A mod designed to improve server performance at high playercounts',
    plasmovoice:
      'A proximity voice chat mod with audio positioning and lots of features',
    simplevoicechat: 'A working voice chat in Minecraft!',
    betteranvil:
      'Shows every renamed CIT and CEM (optifine) in extra anvil menu for better usage of resource packs with renames',
    showmeyourskin: "Hide other player's armor when not in combat",
    ears: 'More skin customization options',
    femalegender: 'A Female Gender Mod Created For Minecraft!',
    camerautils: 'Helpful camera utilities',
    viewdistancefix: 'Forces your view distance on the server',
    vtfix: 'Fixes common issues in vanilla texture pack',
    vt3d: 'Adds 3D models to some 2D blocks (Rails, Ladders, etc.)',
    litematica:
      'Makes it easier to move your builds between creative and survival worlds',
    defaultdarkmode: 'Dark Theme for Minecraft UI',
    ksepsp: 'Add new textures and models to the items by renaming them',
    replaymod: 'A Minecraft Mod to record, relive and share your experience',
    lambdabettergrass:
      'A Minecraft mod which adds better grass and snow to the game',
    emotecraft: 'Create your own emotes in Minecraft',
    capes: 'Lets you use capes from OptiFine, LabyMod and other cape mods',
    advancementinfo: 'Show more information about advancement requirements',
    authme: 'Authenticate yourself in Minecraft and re-validate your session',
    fabricskyboxes: 'Allows resource packs to add custom sky textures',
    vtvariations: 'Adds variations to vanilla textures',
    removereloadingscreen: 'Allows you to interact with the game while loading',
  },
  loadingText: 'Generating your pack...',
  finishedText: 'Your pack is ready!',
  instructions: [
    {
      name: 'PrismLauncher Installation',
      text: 'Drag the .zip file into the PrismLauncher window and click "Ok"',
    },
    {
      name: 'Automatic installation for the vanilla launcher',
      text: 'Use our automatic installer: %INSTALLER_LINKS%',
    },
    {
      name: 'Manual installation for the vanilla launcher',
      text: 'Unpack the archive into the .minecraft folder, replacing all files, then install the latest Quilt Loader v0.20.2',
    },
  ],
  back: 'Back',
  next: 'Next',
  addAnyMod: 'Add any mod from Modrinth',
  chooseVersion: 'Choose Minecraft version',
  cancel: 'Cancel',
  modName: 'Mod name',
  addAnyModNotice:
    'This is an advanced feature, modpacks with custom mods are not guaranteed to work correctly',
  continue: 'Continue',
  earlyVersionWarning:
    'This version is still very new, and not all mods have been updated to it. Please generate a new pack in a couple of weeks to get the full pack',
  linkCopied: 'The link has been copied to the clipboard',
  sharePack: 'Share this pack',
  and: 'and',
  craftedBy: 'This app was crafted by',
  downloadError:
    'An error occurred while generating the pack, please try again later',
  by: 'by',
  chooseAdditionalFeatures: 'Choose additional features',
  discordInvite: 'Follow UnoPack development on Discord',
  viewMods: 'View mods',
  alwaysOn: 'Always on',
  enableRecommended: 'Enable recommended',
  featureTypes: {
    mod: 'Mod',
    resourcePack: 'ResourcePack',
    shaders: 'Shader',
  },
  downloadPack: 'Download the pack',
  quiltWarning:
    'For the pack to work you need to install the Quilt Loader v0.20.2 (not Fabric)! You can do with the instructions below',
  languages: {
    cz: 'Czech',
    ua: 'Ukrainian',
    az: 'Azerbaijani',
    be: 'Belarusian',
    fi: 'Finnish',
  },
  translationBy: 'translation by',
  translationCredits: 'Thanks to everyone who helped with translations',
  status: 'Status',
};

export type Translation = typeof translations;

export default translations;
