import type { Translation } from './en';

export default {
  tagline: 'Paras Minecraft-modpack vanillapelaajille',
  shareTagline: 'Joku jakoi kanssasi tämän UnoPack Packin',
  changeLang: 'Vaihda kieltä',
  landing: {
    cards: [
      {
        title: 'Vanilla',
        text: 'Lisäsimme vain asiakaspuolen modit, jotka optimoivat pelin vanillakokemuksesta poikkeamatta',
      },
      {
        title: 'Modulaarinen',
        text: 'Jokaisella on erilaiset maut, joten voit valita tästä pakkauksesta vain tarkalleen mitä muutoksia tarvitset ja mitä et tarvitse',
      },
      {
        title: 'Ei vain modit',
        text: 'Olemme sisällyttäneet paitsi modit, myös resurssipaketit, varjostimet ja kaikki tarvittavat asetukset - kaikki avuksesi',
      },
    ],
    generateButton: 'Luo varten',
    editButton: 'Muokkaa varten',
    shortDescrition:
      'UnoPackilla voit luoda nopeasti vaniljaa lumoavan Minecraft-modpackin, joka on ihanteellinen sinulle',
  },
  packs: {
    default: {
      name: 'UnoPack Essential Mods',
      description: 'Suorituskykyä parantavat modit',
    },
    roleplay: {
      name: 'Roolipelipaketti',
      description:
        'Muita ihon mukautuksia, hymiöitä, läheisyysäänichat ja paljon muuta',
      imgAltText: 'Minecraft-soitin T-Poseeraa ja käyttää äänichattia',
    },
    utility: {
      name: 'Utility modit',
      description: 'Modit, jotka helpottavat tylsiä asioita',
      imgAltText: 'Minecraftin vaihteet pyörivät',
    },
    contentcreator: {
      name: 'Sisällöntuottajapaketti',
      description: 'Luo elokuvamaisia kuvia käsittelemällä kameraasi',
      imgAltText: 'Minecraft-hahmo kameralla',
    },
    graphics: {
      name: 'Grafiikkapaketti',
      description: 'Tee vanilla Minecraftista kaunis',
      imgAltText: 'Minecraft-puu, jossa on putoavia lehtiä',
    },
  },
  descriptions: {
    'better-stats':
      'Minecraft-modi, joka parantaa tilastonäyttöä ja tekee siitä hyödyllisemmän',
    'boat-item-view': 'Näe hallussa olevat tavarasi liikkuvassa veneessä!',
    'chat-heads': 'Katso kenen kanssa chattailet!',
    'cit-resewn':
      "Toteuttaa uudelleen MCPatcherin CIT'n (muokatut tuotetekstuurit optifine-resurssipakkauksista)",
    'cloth-config': 'Minecraft-modien määrityskirjasto',
    'c2me-fabric':
      'Modi, joka on suunniteltu parantamaan Minecraftin suorituskykyä',
    cem: 'Mukautettujen entiteettimallien tuki Fabricissa',
    dcch: 'Tallentaa chat-historiasi',
    deathlog: 'Pitää kirjaa monista kiusallisista kuolinkerroista',
    e4mc: 'Avaa LAN-palvelin kenelle tahansa, missä tahansa, milloin tahansa',
    moreculling:
      'Asynkronisen polun jäljityksen käyttäminen piilottaaksesi lohkot/kokonaisuudet, jotka eivät ole näkyvissä',
    'ferrite-core': 'Muistin käytön optimointi',
    horsestatsvanilla:
      'Tämä asiakaspuolen modi näyttää varaston hevosten tilastotiedot (terveys, nopeus, hyppykorkeus).',
    immediatelyfast: 'Nopeuta välittömän tilan renderöintiä Minecraftissa',
    indium:
      'Sodium addon providing support for the Fabric Rendering API, based on Indigo',
    inspecio: 'Minecraft-modi, joka lisää työkaluvihjeitä',
    iris: 'Moderni Shader-modi Minecraftille, joka on tarkoitettu yhteensopivaksi olemassa olevien OptiFine-varjostinpakettien kanssa',
    krypton: 'Modi, joka optimoi Minecraft-verkkopinon',
    languagereload: 'Lyhentää latausaikoja ja lisää varoja kielille',
    lithium: 'Ei kompromisseja pelilogiikka/palvelimen optimointimod',
    memoryleakfix:
      'Modi, joka korjaa satunnaiset muistivuodot sekä asiakkaalle että palvelimelle',
    modmenu: 'Lisää mod-valikon nähdäksesi luettelon asentamistasi modeista',
    modelfix: 'Korjaa puutteita lohkomalleissa ja tuotemalleissa',
    notelemetry: "Poista käytöstä 21w38a'ssa käyttöön otettu telemetria",
    okzoomer:
      'Lisää erittäin konfiguroitavan zoomausnäppäimen Quiltille. Zoom on sinun!',
    owolib:
      'Yleinen apuohjelma, graafinen käyttöliittymä ja konfigurointikirjasto Fabric- ja Quilt-muokkaamiseen',
    qkl: 'Quiltin viralliset Kotlin-kirjastot',
    qsl: 'Quilt-ekosysteemin vakiokirjastot. Essential modauskokemuksellesi Quiltillä!',
    reesessodiumoptions: "Vaihtoehtoiset asetukset -valikko Sodium'lle",
    screenshottoclipboard: 'Otetut kuvakaappaukset kopioidaan leikepöydälle',
    sodium:
      'Moderni renderöintimoottori Minecraftille, joka parantaa huomattavasti kuvataajuutta ja mikroääntymistä samalla kun korjaa graafisia ongelmia',
    sodiumextra: "Ominaisuuksia, joita ei pitäisi olla Sodium'ssa",
    starlight:
      'Kirjoittaa valomoottorin uudelleen korjatakseen valaistuksen suorituskyvyn ja valaistusvirheet',
    'status-effect-bars':
      'Lisää muokattavat palkit tilatehostepeittokuvaan näyttämään tehosteiden jäljellä olevan keston',
    technomodel:
      'Nimeä mikä tahansa sika "Technoblade" lisätäksesi sen kruunun sen päähän',
    yacl: 'Rakentajapohjainen määrityskirjasto Minecraftille',
    perspectivemodredux: '360 asteen kolmannen henkilön näkymä',
    continuity: 'Modi, joka mahdollistaa tehokkaan yhdistetyn tekstuurin',
    rethinkingvoxels:
      'Laadukas, hyvin optimoitu Shader-paketti, joka tähtää täydellisyyteen',
    fallingleaves: 'Lisää puihin putoavia lehtiä',
    betterleaves:
      'Tekee lehdistä tuuheat, samalla kun se on yhteensopiva muiden resurssipakettien ja modien kanssa',
    icons: 'Esittelee kuvakkeet pelin eri puolille',
    mousewheelie:
      '"Pieni" asiakaspuolen modi, joka sisältää nimikkeiden vierityksen, varaston lajittelun, tuotteiden uudelleentäytön ja paljon muuta!',
    lambdynamiclights: 'Lisää valoa ympärillesi, kun pidät taskulamppua',
    xaerosworldmap:
      'Lisää koko näytön maailmankartan, joka näyttää mitä olet tutkinut maailmassa. Toimii loistavasti yhdessä Xaeron Minimapin kanssa',
    verymanyplayers:
      'Malli, joka on suunniteltu parantamaan palvelimen suorituskykyä korkealla pelaajamäärällä',
    plasmovoice:
      'Läheisyysäänichat-modi, jossa on äänen sijoittelu ja paljon ominaisuuksia',
    simplevoicechat: 'Toimiva äänikeskustelu Minecraftissa!',
    betteranvil:
      'Näyttää kaikki uudelleen nimetyt CIT ja CEM (optifine) ylimääräisessä alasimen valikossa, jotta resurssipaketteja voidaan käyttää paremmin uudelleennimettyjen kanssa',
    showmeyourskin: 'Piilota toisen pelaajan panssari, kun et ole taistelussa',
    ears: 'Lisää ihon mukautusvaihtoehtoja',
    femalegender: 'Minecraftille luotu naissukupuolen modi!',
    camerautils: 'Hyödyllisiä kameraapuohjelmia',
    viewdistancefix: 'Pakottaa katseluetäisyyden palvelimelle',
    vtfix: 'Korjaa yleiset ongelmat vaniljatekstuuripakkauksessa',
    vt3d: 'Lisää 3D-malleja joihinkin 2D-lohkoihin (kiskot, tikkaat jne.)',
    litematica:
      'Helpottaa rakennustesi siirtämistä luovan ja selviytymismaailman välillä',
    defaultdarkmode: 'Tumma teema Minecraft-käyttöliittymälle',
    ksepsp:
      'Lisää uusia pintakuvioita ja malleja esineisiin nimeämällä ne uudelleen',
    replaymod:
      'Minecraft-modi, jolla voit tallentaa, elää uudelleen ja jakaa kokemuksiasi',
    lambdabettergrass:
      'Minecraft-modi, joka lisää parempaa ruohoa ja lunta peliin',
    emotecraft: 'Luo omia hymiöitä Minecraftissa',
    capes: 'Mahdollistaa OptiFinen, LabyModin ja muiden viittamallien käytön',
    advancementinfo: 'Näytä lisätietoja edistymisvaatimuksista',
    authme: 'Todenna itsesi Minecraftissa ja vahvista istuntosi uudelleen',
    fabricskyboxes:
      'Sallii resurssipakettien lisätä mukautettuja taivaskuvioita',
    vtvariations: 'Lisää variaatioita vaniljatekstuureihin',
    removereloadingscreen:
      'Voit olla vuorovaikutuksessa pelin kanssa latauksen aikana',
  },
  loadingText: 'Luodaan pakettia...',
  finishedText: 'Pakettisi on valmis!',
  instructions: [
    {
      name: 'PrismLauncherin asennus',
      text: 'Vedä .zip-tiedosto PrismLauncher-ikkunaan ja napsauta "Ok"',
    },
    {
      name: 'Automaattinen vaniljalaukaisimen asennus',
      text: 'Käytä automaattista asennusohjelmaamme: %INSTALLER_LINKS%',
    },
    {
      name: 'Manuaalinen asennus vaniljanheittimelle',
      text: 'Pura arkisto .minecraft-kansioon, korvaa kaikki tiedostot ja asenna sitten uusin Quilt Loader v0.20.2',
    },
  ],
  back: 'Takaisin',
  next: 'Seuraava',
  addAnyMod: 'Lisää mikä tahansa mod Modrinthista',
  chooseVersion: 'Valitse Minecraft-versio',
  cancel: 'Peruuttaa',
  modName: 'Modin nimi',
  addAnyModNotice:
    'Tämä on edistynyt ominaisuus, eikä mukautetuilla moduuksilla varustettujen modpackien toimivuutta voida taata',
  continue: 'Jatkaa',
  earlyVersionWarning:
    'Tämä versio on vielä hyvin uusi, eikä kaikkia modeja ole päivitetty siihen. Luo uusi paketti muutaman viikon sisällä saadaksesi täyden paketin',
  linkCopied: 'Linkki on kopioitu leikepöydälle',
  sharePack: 'Jaa tämä paketti',
  and: 'ja',
  craftedBy: 'Tämän sovelluksen on kehittänyt',
  downloadError:
    'Pakkauksen luomisessa tapahtui virhe. Yritä myöhemmin uudelleen',
  by: 'kirjoittaja',
  chooseAdditionalFeatures: 'Valitse lisäominaisuudet',
  discordInvite: 'Seuraa UnoPackin kehitystä Discordissa',
  viewMods: 'Katso modit',
  alwaysOn: 'Aina päällä',
  enableRecommended: 'Ota käyttöön suositeltu',
  featureTypes: {
    mod: 'Modi',
    resourcePack: 'ResourcePack',
    shaders: 'Shader',
  },
  downloadPack: 'Lataa paketti',
  quiltWarning:
    'Jotta paketti toimisi, sinun on asennettava Quilt Loader v0.20.2 (ei kangas)! Voit tehdä sen alla olevilla ohjeilla',
  languages: {
    cz: 'Tšekki kieli',
    ua: 'ukrainan kieli',
    az: 'Azerbaidžani kieli',
    be: 'Valkovenäjän kieli',
    fi: 'Suomen kieli',
  },
  translationBy: 'käännös',
  translationCredits: 'Kiitos kaikille käännöksissä auttaneille',
  status: 'Tila',
} satisfies Translation;
