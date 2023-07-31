import { useState } from "react";

export const url = "https://image.tmdb.org/t/p/original";

export const getNumber = function(num, round = 3) {
    const unit = Math.floor(Math.round(num / 1.0e+1).toLocaleString().replaceAll(',', '').length),
        wunit = ["thousand","million","billion","trillion","Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion","Decillion","Undecillion","Duodecillion","Tredecillion","Quattuordecillion","Quindecillion","Sexdecillion","Septemdecillion","Octodecillion","Novemdecillion","Vigintillion","Unvigintillion","Duovigintillion","Trevigintillion","Quattuorvigintillion","Quinvigintillion","Sexvigintillion","Septvigintillion","Octovigintillion","Nonvigintillion","Trigintillion","Untrigintillion","Duotrigintillion"][Math.floor(unit / 3) - 1],
        funit = Math.abs(Number(num))/Number('1.0e+'+(unit-unit%3));
    return wunit ? funit.toFixed(round).toLocaleString() + ' ' + wunit : num.toFixed(round).toString();
}

export const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
};

export const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${ hours > 0 ? hours > 9 ? `${hours}h` : `0${hours}h` : `` }${ minutes > 0 ? minutes > 9 ? ` ${minutes}m` : ` 0${minutes}m` : "" }`;
};

export const isoLangs = {
    "ab":{
        "name":"Abkhaz",
        "nativeName":"аҧсуа"
    },
    "aa":{
        "name":"Afar",
        "nativeName":"Afaraf"
    },
    "af":{
        "name":"Afrikaans",
        "nativeName":"Afrikaans"
    },
    "ak":{
        "name":"Akan",
        "nativeName":"Akan"
    },
    "sq":{
        "name":"Albanian",
        "nativeName":"Shqip"
    },
    "am":{
        "name":"Amharic",
        "nativeName":"አማርኛ"
    },
    "ar":{
        "name":"Arabic",
        "nativeName":"العربية"
    },
    "an":{
        "name":"Aragonese",
        "nativeName":"Aragonés"
    },
    "hy":{
        "name":"Armenian",
        "nativeName":"Հայերեն"
    },
    "as":{
        "name":"Assamese",
        "nativeName":"অসমীয়া"
    },
    "av":{
        "name":"Avaric",
        "nativeName":"авар мацӀ, магӀарул мацӀ"
    },
    "ae":{
        "name":"Avestan",
        "nativeName":"avesta"
    },
    "ay":{
        "name":"Aymara",
        "nativeName":"aymar aru"
    },
    "az":{
        "name":"Azerbaijani",
        "nativeName":"azərbaycan dili"
    },
    "bm":{
        "name":"Bambara",
        "nativeName":"bamanankan"
    },
    "ba":{
        "name":"Bashkir",
        "nativeName":"башҡорт теле"
    },
    "eu":{
        "name":"Basque",
        "nativeName":"euskara, euskera"
    },
    "be":{
        "name":"Belarusian",
        "nativeName":"Беларуская"
    },
    "bn":{
        "name":"Bengali",
        "nativeName":"বাংলা"
    },
    "bh":{
        "name":"Bihari",
        "nativeName":"भोजपुरी"
    },
    "bi":{
        "name":"Bislama",
        "nativeName":"Bislama"
    },
    "bs":{
        "name":"Bosnian",
        "nativeName":"bosanski jezik"
    },
    "br":{
        "name":"Breton",
        "nativeName":"brezhoneg"
    },
    "bg":{
        "name":"Bulgarian",
        "nativeName":"български език"
    },
    "my":{
        "name":"Burmese",
        "nativeName":"ဗမာစာ"
    },
    "ca":{
        "name":"Catalan",
        "nativeName":"Català"
    },
    "ch":{
        "name":"Chamorro",
        "nativeName":"Chamoru"
    },
    "ce":{
        "name":"Chechen",
        "nativeName":"нохчийн мотт"
    },
    "ny":{
        "name":"Chichewa",
        "nativeName":"chiCheŵa, chinyanja"
    },
    "zh":{
        "name":"Chinese",
        "nativeName":"中文 (Zhōngwén), 汉语, 漢語"
    },
    "cv":{
        "name":"Chuvash",
        "nativeName":"чӑваш чӗлхи"
    },
    "kw":{
        "name":"Cornish",
        "nativeName":"Kernewek"
    },
    "co":{
        "name":"Corsican",
        "nativeName":"corsu, lingua corsa"
    },
    "cr":{
        "name":"Cree",
        "nativeName":"ᓀᐦᐃᔭᐍᐏᐣ"
    },
    "hr":{
        "name":"Croatian",
        "nativeName":"hrvatski"
    },
    "cs":{
        "name":"Czech",
        "nativeName":"česky, čeština"
    },
    "da":{
        "name":"Danish",
        "nativeName":"dansk"
    },
    "dv":{
        "name":"Divehi",
        "nativeName":"ދިވެހި"
    },
    "nl":{
        "name":"Dutch",
        "nativeName":"Nederlands, Vlaams"
    },
    "en":{
        "name":"English",
        "nativeName":"English"
    },
    "eo":{
        "name":"Esperanto",
        "nativeName":"Esperanto"
    },
    "et":{
        "name":"Estonian",
        "nativeName":"eesti, eesti keel"
    },
    "ee":{
        "name":"Ewe",
        "nativeName":"Eʋegbe"
    },
    "fo":{
        "name":"Faroese",
        "nativeName":"føroyskt"
    },
    "fj":{
        "name":"Fijian",
        "nativeName":"vosa Vakaviti"
    },
    "fi":{
        "name":"Finnish",
        "nativeName":"suomi, suomen kieli"
    },
    "fr":{
        "name":"French",
        "nativeName":"français, langue française"
    },
    "ff":{
        "name":"Fula",
        "nativeName":"Fulfulde, Pulaar, Pular"
    },
    "gl":{
        "name":"Galician",
        "nativeName":"Galego"
    },
    "ka":{
        "name":"Georgian",
        "nativeName":"ქართული"
    },
    "de":{
        "name":"German",
        "nativeName":"Deutsch"
    },
    "el":{
        "name":"Greek",
        "nativeName":"Ελληνικά"
    },
    "gn":{
        "name":"Guaraní",
        "nativeName":"Avañeẽ"
    },
    "gu":{
        "name":"Gujarati",
        "nativeName":"ગુજરાતી"
    },
    "ht":{
        "name":"Haitian",
        "nativeName":"Kreyòl ayisyen"
    },
    "ha":{
        "name":"Hausa",
        "nativeName":"Hausa, هَوُسَ"
    },
    "he":{
        "name":"Hebrew",
        "nativeName":"עברית"
    },
    "hz":{
        "name":"Herero",
        "nativeName":"Otjiherero"
    },
    "hi":{
        "name":"Hindi",
        "nativeName":"हिन्दी, हिंदी"
    },
    "ho":{
        "name":"Hiri Motu",
        "nativeName":"Hiri Motu"
    },
    "hu":{
        "name":"Hungarian",
        "nativeName":"Magyar"
    },
    "ia":{
        "name":"Interlingua",
        "nativeName":"Interlingua"
    },
    "id":{
        "name":"Indonesian",
        "nativeName":"Bahasa Indonesia"
    },
    "ie":{
        "name":"Interlingue",
        "nativeName":"Originally called Occidental; then Interlingue after WWII"
    },
    "ga":{
        "name":"Irish",
        "nativeName":"Gaeilge"
    },
    "ig":{
        "name":"Igbo",
        "nativeName":"Asụsụ Igbo"
    },
    "ik":{
        "name":"Inupiaq",
        "nativeName":"Iñupiaq, Iñupiatun"
    },
    "io":{
        "name":"Ido",
        "nativeName":"Ido"
    },
    "is":{
        "name":"Icelandic",
        "nativeName":"Íslenska"
    },
    "it":{
        "name":"Italian",
        "nativeName":"Italiano"
    },
    "iu":{
        "name":"Inuktitut",
        "nativeName":"ᐃᓄᒃᑎᑐᑦ"
    },
    "ja":{
        "name":"Japanese",
        "nativeName":"日本語 (にほんご／にっぽんご)"
    },
    "jv":{
        "name":"Javanese",
        "nativeName":"basa Jawa"
    },
    "kl":{
        "name":"Kalaallisut",
        "nativeName":"kalaallisut, kalaallit oqaasii"
    },
    "kn":{
        "name":"Kannada",
        "nativeName":"ಕನ್ನಡ"
    },
    "kr":{
        "name":"Kanuri",
        "nativeName":"Kanuri"
    },
    "ks":{
        "name":"Kashmiri",
        "nativeName":"कश्मीरी, كشميري‎"
    },
    "kk":{
        "name":"Kazakh",
        "nativeName":"Қазақ тілі"
    },
    "km":{
        "name":"Khmer",
        "nativeName":"ភាសាខ្មែរ"
    },
    "ki":{
        "name":"Kikuyu",
        "nativeName":"Gĩkũyũ"
    },
    "rw":{
        "name":"Kinyarwanda",
        "nativeName":"Ikinyarwanda"
    },
    "ky":{
        "name":"Kirghiz",
        "nativeName":"кыргыз тили"
    },
    "kv":{
        "name":"Komi",
        "nativeName":"коми кыв"
    },
    "kg":{
        "name":"Kongo",
        "nativeName":"KiKongo"
    },
    "ko":{
        "name":"Korean",
        "nativeName":"한국어 (韓國語), 조선말 (朝鮮語)"
    },
    "ku":{
        "name":"Kurdish",
        "nativeName":"Kurdî, كوردی‎"
    },
    "kj":{
        "name":"Kwanyama",
        "nativeName":"Kuanyama"
    },
    "la":{
        "name":"Latin",
        "nativeName":"latine, lingua latina"
    },
    "lb":{
        "name":"Luxembourgish",
        "nativeName":"Lëtzebuergesch"
    },
    "lg":{
        "name":"Luganda",
        "nativeName":"Luganda"
    },
    "li":{
        "name":"Limburgish",
        "nativeName":"Limburgs"
    },
    "ln":{
        "name":"Lingala",
        "nativeName":"Lingála"
    },
    "lo":{
        "name":"Lao",
        "nativeName":"ພາສາລາວ"
    },
    "lt":{
        "name":"Lithuanian",
        "nativeName":"lietuvių kalba"
    },
    "lu":{
        "name":"Luba-Katanga",
        "nativeName":""
    },
    "lv":{
        "name":"Latvian",
        "nativeName":"latviešu valoda"
    },
    "gv":{
        "name":"Manx",
        "nativeName":"Gaelg, Gailck"
    },
    "mk":{
        "name":"Macedonian",
        "nativeName":"македонски јазик"
    },
    "mg":{
        "name":"Malagasy",
        "nativeName":"Malagasy fiteny"
    },
    "ms":{
        "name":"Malay",
        "nativeName":"bahasa Melayu, بهاس ملايو‎"
    },
    "ml":{
        "name":"Malayalam",
        "nativeName":"മലയാളം"
    },
    "mt":{
        "name":"Maltese",
        "nativeName":"Malti"
    },
    "mi":{
        "name":"Māori",
        "nativeName":"te reo Māori"
    },
    "mr":{
        "name":"Marathi",
        "nativeName":"मराठी"
    },
    "mh":{
        "name":"Marshallese",
        "nativeName":"Kajin M̧ajeļ"
    },
    "mn":{
        "name":"Mongolian",
        "nativeName":"монгол"
    },
    "na":{
        "name":"Nauru",
        "nativeName":"Ekakairũ Naoero"
    },
    "nv":{
        "name":"Navajo",
        "nativeName":"Diné bizaad, Dinékʼehǰí"
    },
    "nb":{
        "name":"Norwegian",
        "nativeName":"Norsk bokmål"
    },
    "nd":{
        "name":"Ndebele",
        "nativeName":"isiNdebele"
    },
    "ne":{
        "name":"Nepali",
        "nativeName":"नेपाली"
    },
    "ng":{
        "name":"Ndonga",
        "nativeName":"Owambo"
    },
    "nn":{
        "name":"Nynorsk",
        "nativeName":"Norsk nynorsk"
    },
    "no":{
        "name":"Norwegian",
        "nativeName":"Norsk"
    },
    "ii":{
        "name":"Nuosu",
        "nativeName":"ꆈꌠ꒿ Nuosuhxop"
    },
    "nr":{
        "name":"Ndebele",
        "nativeName":"isiNdebele"
    },
    "oc":{
        "name":"Occitan",
        "nativeName":"Occitan"
    },
    "oj":{
        "name":"Ojibwe",
        "nativeName":"ᐊᓂᔑᓈᐯᒧᐎᓐ"
    },
    "cu":{
        "name":"Slavonic",
        "nativeName":"ѩзыкъ словѣньскъ"
    },
    "om":{
        "name":"Oromo",
        "nativeName":"Afaan Oromoo"
    },
    "or":{
        "name":"Oriya",
        "nativeName":"ଓଡ଼ିଆ"
    },
    "os":{
        "name":"Ossetian",
        "nativeName":"ирон æвзаг"
    },
    "pa":{
        "name":"Punjabi",
        "nativeName":"ਪੰਜਾਬੀ, پنجابی‎"
    },
    "pi":{
        "name":"Pāli",
        "nativeName":"पाऴि"
    },
    "fa":{
        "name":"Persian",
        "nativeName":"فارسی"
    },
    "pl":{
        "name":"Polish",
        "nativeName":"polski"
    },
    "ps":{
        "name":"Pushto",
        "nativeName":"پښتو"
    },
    "pt":{
        "name":"Portuguese",
        "nativeName":"Português"
    },
    "qu":{
        "name":"Quechua",
        "nativeName":"Runa Simi, Kichwa"
    },
    "rm":{
        "name":"Romansh",
        "nativeName":"rumantsch grischun"
    },
    "rn":{
        "name":"Kirundi",
        "nativeName":"kiRundi"
    },
    "ro":{
        "name":"Romanian",
        "nativeName":"română"
    },
    "ru":{
        "name":"Russian",
        "nativeName":"русский язык"
    },
    "sa":{
        "name":"Sanskrit",
        "nativeName":"संस्कृतम्"
    },
    "sc":{
        "name":"Sardinian",
        "nativeName":"sardu"
    },
    "sd":{
        "name":"Sindhi",
        "nativeName":"सिन्धी, سنڌي، سندھی‎"
    },
    "se":{
        "name":"Sami",
        "nativeName":"Davvisámegiella"
    },
    "sm":{
        "name":"Samoan",
        "nativeName":"gagana faa Samoa"
    },
    "sg":{
        "name":"Sango",
        "nativeName":"yângâ tî sängö"
    },
    "sr":{
        "name":"Serbian",
        "nativeName":"српски језик"
    },
    "gd":{
        "name":"Gaelic",
        "nativeName":"Gàidhlig"
    },
    "sn":{
        "name":"Shona",
        "nativeName":"chiShona"
    },
    "si":{
        "name":"Sinhala",
        "nativeName":"සිංහල"
    },
    "sk":{
        "name":"Slovak",
        "nativeName":"slovenčina"
    },
    "sl":{
        "name":"Slovene",
        "nativeName":"slovenščina"
    },
    "so":{
        "name":"Somali",
        "nativeName":"Soomaaliga, af Soomaali"
    },
    "st":{
        "name":"Sotho",
        "nativeName":"Sesotho"
    },
    "es":{
        "name":"Spanish",
        "nativeName":"español, castellano"
    },
    "su":{
        "name":"Sundanese",
        "nativeName":"Basa Sunda"
    },
    "sw":{
        "name":"Swahili",
        "nativeName":"Kiswahili"
    },
    "ss":{
        "name":"Swati",
        "nativeName":"SiSwati"
    },
    "sv":{
        "name":"Swedish",
        "nativeName":"svenska"
    },
    "ta":{
        "name":"Tamil",
        "nativeName":"தமிழ்"
    },
    "te":{
        "name":"Telugu",
        "nativeName":"తెలుగు"
    },
    "tg":{
        "name":"Tajik",
        "nativeName":"тоҷикӣ, toğikī, تاجیکی‎"
    },
    "th":{
        "name":"Thai",
        "nativeName":"ไทย"
    },
    "ti":{
        "name":"Tigrinya",
        "nativeName":"ትግርኛ"
    },
    "bo":{
        "name":"Tibetan",
        "nativeName":"བོད་ཡིག"
    },
    "tk":{
        "name":"Turkmen",
        "nativeName":"Türkmen, Түркмен"
    },
    "tl":{
        "name":"Tagalog",
        "nativeName":"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"
    },
    "tn":{
        "name":"Tswana",
        "nativeName":"Setswana"
    },
    "to":{
        "name":"Tonga",
        "nativeName":"faka Tonga"
    },
    "tr":{
        "name":"Turkish",
        "nativeName":"Türkçe"
    },
    "ts":{
        "name":"Tsonga",
        "nativeName":"Xitsonga"
    },
    "tt":{
        "name":"Tatar",
        "nativeName":"татарча, tatarça, تاتارچا‎"
    },
    "tw":{
        "name":"Twi",
        "nativeName":"Twi"
    },
    "ty":{
        "name":"Tahitian",
        "nativeName":"Reo Tahiti"
    },
    "ug":{
        "name":"Uighur",
        "nativeName":"Uyƣurqə, ئۇيغۇرچە‎"
    },
    "uk":{
        "name":"Ukrainian",
        "nativeName":"українська"
    },
    "ur":{
        "name":"Urdu",
        "nativeName":"اردو"
    },
    "uz":{
        "name":"Uzbek",
        "nativeName":"zbek, Ўзбек, أۇزبېك‎"
    },
    "ve":{
        "name":"Venda",
        "nativeName":"Tshivenḓa"
    },
    "vi":{
        "name":"Vietnamese",
        "nativeName":"Tiếng Việt"
    },
    "vo":{
        "name":"Volapük",
        "nativeName":"Volapük"
    },
    "wa":{
        "name":"Walloon",
        "nativeName":"Walon"
    },
    "cy":{
        "name":"Welsh",
        "nativeName":"Cymraeg"
    },
    "wo":{
        "name":"Wolof",
        "nativeName":"Wollof"
    },
    "fy":{
        "name":"Frisian",
        "nativeName":"Frysk"
    },
    "xh":{
        "name":"Xhosa",
        "nativeName":"isiXhosa"
    },
    "yi":{
        "name":"Yiddish",
        "nativeName":"ייִדיש"
    },
    "yo":{
        "name":"Yoruba",
        "nativeName":"Yorùbá"
    },
    "za":{
        "name":"Zhuang",
        "nativeName":"Saɯ cueŋƅ, Saw cuengh"
    }
}

export const isoLangs1 = [
    {code:"ab",name:"Abkhaz",nativeName:"аҧсуа"},
    {code:"aa",name:"Afar",nativeName:"Afaraf"},
    {code:"af",name:"Afrikaans",nativeName:"Afrikaans"},
    {code:"ak",name:"Akan",nativeName:"Akan"},
    {code:"sq",name:"Albanian",nativeName:"Shqip"},
    {code:"am",name:"Amharic",nativeName:"አማርኛ"},
    {code:"ar",name:"Arabic",nativeName:"العربية"},
    {code:"an",name:"Aragonese",nativeName:"Aragonés"},
    {code:"hy",name:"Armenian",nativeName:"Հայերեն"},
    {code:"as",name:"Assamese",nativeName:"অসমীয়া"},
    {code:"av",name:"Avaric",nativeName:"авар мацӀ, магӀарул мацӀ"},
    {code:"ae",name:"Avestan",nativeName:"avesta"},
    {code:"ay",name:"Aymara",nativeName:"aymar aru"},
    {code:"az",name:"Azerbaijani",nativeName:"azərbaycan dili"},
    {code:"bm",name:"Bambara",nativeName:"bamanankan"},
    {code:"ba",name:"Bashkir",nativeName:"башҡорт теле"},
    {code:"eu",name:"Basque",nativeName:"euskara, euskera"},
    {code:"be",name:"Belarusian",nativeName:"Беларуская"},
    {code:"bn",name:"Bengali",nativeName:"বাংলা"},
    {code:"bh",name:"Bihari",nativeName:"भोजपुरी"},
    {code:"bi",name:"Bislama",nativeName:"Bislama"},
    {code:"bs",name:"Bosnian",nativeName:"bosanski jezik"},
    {code:"br",name:"Breton",nativeName:"brezhoneg"},
    {code:"bg",name:"Bulgarian",nativeName:"български език"},
    {code:"my",name:"Burmese",nativeName:"ဗမာစာ"},
    {code:"ca",name:"Catalan; Valencian",nativeName:"Català"},
    {code:"ch",name:"Chamorro",nativeName:"Chamoru"},
    {code:"ce",name:"Chechen",nativeName:"нохчийн мотт"},
    {code:"ny",name:"Chichewa; Chewa; Nyanja",nativeName:"chiCheŵa, chinyanja"},
    {code:"zh",name:"Chinese",nativeName:"中文 (Zhōngwén), 汉语, 漢語"},
    {code:"cv",name:"Chuvash",nativeName:"чӑваш чӗлхи"},
    {code:"kw",name:"Cornish",nativeName:"Kernewek"},
    {code:"co",name:"Corsican",nativeName:"corsu, lingua corsa"},
    {code:"cr",name:"Cree",nativeName:"ᓀᐦᐃᔭᐍᐏᐣ"},
    {code:"hr",name:"Croatian",nativeName:"hrvatski"},
    {code:"cs",name:"Czech",nativeName:"česky, čeština"},
    {code:"da",name:"Danish",nativeName:"dansk"},
    {code:"dv",name:"Divehi; Dhivehi; Maldivian;",nativeName:"ދިވެހި"},
    {code:"nl",name:"Dutch",nativeName:"Nederlands, Vlaams"},
    {code:"en",name:"English",nativeName:"English"},
    {code:"eo",name:"Esperanto",nativeName:"Esperanto"},
    {code:"et",name:"Estonian",nativeName:"eesti, eesti keel"},
    {code:"ee",name:"Ewe",nativeName:"Eʋegbe"},
    {code:"fo",name:"Faroese",nativeName:"føroyskt"},
    {code:"fj",name:"Fijian",nativeName:"vosa Vakaviti"},
    {code:"fi",name:"Finnish",nativeName:"suomi, suomen kieli"},
    {code:"fr",name:"French",nativeName:"français, langue française"},
    {code:"ff",name:"Fula; Fulah; Pulaar; Pular",nativeName:"Fulfulde, Pulaar, Pular"},
    {code:"gl",name:"Galician",nativeName:"Galego"},
    {code:"ka",name:"Georgian",nativeName:"ქართული"},
    {code:"de",name:"German",nativeName:"Deutsch"},
    {code:"el",name:"Greek, Modern",nativeName:"Ελληνικά"},
    {code:"gn",name:"Guaraní",nativeName:"Avañeẽ"},
    {code:"gu",name:"Gujarati",nativeName:"ગુજરાતી"},
    {code:"ht",name:"Haitian; Haitian Creole",nativeName:"Kreyòl ayisyen"},
    {code:"ha",name:"Hausa",nativeName:"Hausa, هَوُسَ"},
    {code:"he",name:"Hebrew (modern)",nativeName:"עברית"},
    {code:"hz",name:"Herero",nativeName:"Otjiherero"},
    {code:"hi",name:"Hindi",nativeName:"हिन्दी, हिंदी"},
    {code:"ho",name:"Hiri Motu",nativeName:"Hiri Motu"},
    {code:"hu",name:"Hungarian",nativeName:"Magyar"},
    {code:"ia",name:"Interlingua",nativeName:"Interlingua"},
    {code:"id",name:"Indonesian",nativeName:"Bahasa Indonesia"},
    {code:"ie",name:"Interlingue",nativeName:"Originally called Occidental; then Interlingue after WWII"},
    {code:"ga",name:"Irish",nativeName:"Gaeilge"},
    {code:"ig",name:"Igbo",nativeName:"Asụsụ Igbo"},
    {code:"ik",name:"Inupiaq",nativeName:"Iñupiaq, Iñupiatun"},
    {code:"io",name:"Ido",nativeName:"Ido"},
    {code:"is",name:"Icelandic",nativeName:"Íslenska"},
    {code:"it",name:"Italian",nativeName:"Italiano"},
    {code:"iu",name:"Inuktitut",nativeName:"ᐃᓄᒃᑎᑐᑦ"},
    {code:"ja",name:"Japanese",nativeName:"日本語 (にほんご／にっぽんご)"},
    {code:"jv",name:"Javanese",nativeName:"basa Jawa"},
    {code:"kl",name:"Kalaallisut, Greenlandic",nativeName:"kalaallisut, kalaallit oqaasii"},
    {code:"kn",name:"Kannada",nativeName:"ಕನ್ನಡ"},
    {code:"kr",name:"Kanuri",nativeName:"Kanuri"},
    {code:"ks",name:"Kashmiri",nativeName:"कश्मीरी, كشميري‎"},
    {code:"kk",name:"Kazakh",nativeName:"Қазақ тілі"},
    {code:"km",name:"Khmer",nativeName:"ភាសាខ្មែរ"},
    {code:"ki",name:"Kikuyu, Gikuyu",nativeName:"Gĩkũyũ"},
    {code:"rw",name:"Kinyarwanda",nativeName:"Ikinyarwanda"},
    {code:"ky",name:"Kirghiz, Kyrgyz",nativeName:"кыргыз тили"},
    {code:"kv",name:"Komi",nativeName:"коми кыв"},
    {code:"kg",name:"Kongo",nativeName:"KiKongo"},
    {code:"ko",name:"Korean",nativeName:"한국어 (韓國語), 조선말 (朝鮮語)"},
    {code:"ku",name:"Kurdish",nativeName:"Kurdî, كوردی‎"},
    {code:"kj",name:"Kwanyama, Kuanyama",nativeName:"Kuanyama"},
    {code:"la",name:"Latin",nativeName:"latine, lingua latina"},
    {code:"lb",name:"Luxembourgish, Letzeburgesch",nativeName:"Lëtzebuergesch"},
    {code:"lg",name:"Luganda",nativeName:"Luganda"},
    {code:"li",name:"Limburgish, Limburgan, Limburger",nativeName:"Limburgs"},
    {code:"ln",name:"Lingala",nativeName:"Lingála"},
    {code:"lo",name:"Lao",nativeName:"ພາສາລາວ"},
    {code:"lt",name:"Lithuanian",nativeName:"lietuvių kalba"},
    {code:"lu",name:"Luba-Katanga",nativeName:""},
    {code:"lv",name:"Latvian",nativeName:"latviešu valoda"},
    {code:"gv",name:"Manx",nativeName:"Gaelg, Gailck"},
    {code:"mk",name:"Macedonian",nativeName:"македонски јазик"},
    {code:"mg",name:"Malagasy",nativeName:"Malagasy fiteny"},
    {code:"ms",name:"Malay",nativeName:"bahasa Melayu, بهاس ملايو‎"},
    {code:"ml",name:"Malayalam",nativeName:"മലയാളം"},
    {code:"mt",name:"Maltese",nativeName:"Malti"},
    {code:"mi",name:"Māori",nativeName:"te reo Māori"},
    {code:"mr",name:"Marathi (Marāṭhī)",nativeName:"मराठी"},
    {code:"mh",name:"Marshallese",nativeName:"Kajin M̧ajeļ"},
    {code:"mn",name:"Mongolian",nativeName:"монгол"},
    {code:"na",name:"Nauru",nativeName:"Ekakairũ Naoero"},
    {code:"nv",name:"Navajo, Navaho",nativeName:"Diné bizaad, Dinékʼehǰí"},
    {code:"nb",name:"Norwegian Bokmål",nativeName:"Norsk bokmål"},
    {code:"nd",name:"North Ndebele",nativeName:"isiNdebele"},
    {code:"ne",name:"Nepali",nativeName:"नेपाली"},
    {code:"ng",name:"Ndonga",nativeName:"Owambo"},
    {code:"nn",name:"Norwegian Nynorsk",nativeName:"Norsk nynorsk"},
    {code:"no",name:"Norwegian",nativeName:"Norsk"},
    {code:"ii",name:"Nuosu",nativeName:"ꆈꌠ꒿ Nuosuhxop"},
    {code:"nr",name:"South Ndebele",nativeName:"isiNdebele"},
    {code:"oc",name:"Occitan",nativeName:"Occitan"},
    {code:"oj",name:"Ojibwe, Ojibwa",nativeName:"ᐊᓂᔑᓈᐯᒧᐎᓐ"},
    {code:"cu",name:"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",nativeName:"ѩзыкъ словѣньскъ"},
    {code:"om",name:"Oromo",nativeName:"Afaan Oromoo"},
    {code:"or",name:"Oriya",nativeName:"ଓଡ଼ିଆ"},
    {code:"os",name:"Ossetian, Ossetic",nativeName:"ирон æвзаг"},
    {code:"pa",name:"Panjabi, Punjabi",nativeName:"ਪੰਜਾਬੀ, پنجابی‎"},
    {code:"pi",name:"Pāli",nativeName:"पाऴि"},
    {code:"fa",name:"Persian",nativeName:"فارسی"},
    {code:"pl",name:"Polish",nativeName:"polski"},
    {code:"ps",name:"Pashto, Pushto",nativeName:"پښتو"},
    {code:"pt",name:"Portuguese",nativeName:"Português"},
    {code:"qu",name:"Quechua",nativeName:"Runa Simi, Kichwa"},
    {code:"rm",name:"Romansh",nativeName:"rumantsch grischun"},
    {code:"rn",name:"Kirundi",nativeName:"kiRundi"},
    {code:"ro",name:"Romanian, Moldavian, Moldovan",nativeName:"română"},
    {code:"ru",name:"Russian",nativeName:"русский язык"},
    {code:"sa",name:"Sanskrit (Saṁskṛta)",nativeName:"संस्कृतम्"},
    {code:"sc",name:"Sardinian",nativeName:"sardu"},
    {code:"sd",name:"Sindhi",nativeName:"सिन्धी, سنڌي، سندھی‎"},
    {code:"se",name:"Northern Sami",nativeName:"Davvisámegiella"},
    {code:"sm",name:"Samoan",nativeName:"gagana faa Samoa"},
    {code:"sg",name:"Sango",nativeName:"yângâ tî sängö"},
    {code:"sr",name:"Serbian",nativeName:"српски језик"},
    {code:"gd",name:"Scottish Gaelic; Gaelic",nativeName:"Gàidhlig"},
    {code:"sn",name:"Shona",nativeName:"chiShona"},
    {code:"si",name:"Sinhala, Sinhalese",nativeName:"සිංහල"},
    {code:"sk",name:"Slovak",nativeName:"slovenčina"},
    {code:"sl",name:"Slovene",nativeName:"slovenščina"},
    {code:"so",name:"Somali",nativeName:"Soomaaliga, af Soomaali"},
    {code:"st",name:"Southern Sotho",nativeName:"Sesotho"},
    {code:"es",name:"Spanish; Castilian",nativeName:"español, castellano"},
    {code:"su",name:"Sundanese",nativeName:"Basa Sunda"},
    {code:"sw",name:"Swahili",nativeName:"Kiswahili"},
    {code:"ss",name:"Swati",nativeName:"SiSwati"},
    {code:"sv",name:"Swedish",nativeName:"svenska"},
    {code:"ta",name:"Tamil",nativeName:"தமிழ்"},
    {code:"te",name:"Telugu",nativeName:"తెలుగు"},
    {code:"tg",name:"Tajik",nativeName:"тоҷикӣ, toğikī, تاجیکی‎"},
    {code:"th",name:"Thai",nativeName:"ไทย"},
    {code:"ti",name:"Tigrinya",nativeName:"ትግርኛ"},
    {code:"bo",name:"Tibetan Standard, Tibetan, Central",nativeName:"བོད་ཡིག"},
    {code:"tk",name:"Turkmen",nativeName:"Türkmen, Түркмен"},
    {code:"tl",name:"Tagalog",nativeName:"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"},
    {code:"tn",name:"Tswana",nativeName:"Setswana"},
    {code:"to",name:"Tonga (Tonga Islands)",nativeName:"faka Tonga"},
    {code:"tr",name:"Turkish",nativeName:"Türkçe"},
    {code:"ts",name:"Tsonga",nativeName:"Xitsonga"},
    {code:"tt",name:"Tatar",nativeName:"татарча, tatarça, تاتارچا‎"},
    {code:"tw",name:"Twi",nativeName:"Twi"},
    {code:"ty",name:"Tahitian",nativeName:"Reo Tahiti"},
    {code:"ug",name:"Uighur, Uyghur",nativeName:"Uyƣurqə, ئۇيغۇرچە‎"},
    {code:"uk",name:"Ukrainian",nativeName:"українська"},
    {code:"ur",name:"Urdu",nativeName:"اردو"},
    {code:"uz",name:"Uzbek",nativeName:"zbek, Ўзбек, أۇزبېك‎"},
    {code:"ve",name:"Venda",nativeName:"Tshivenḓa"},
    {code:"vi",name:"Vietnamese",nativeName:"Tiếng Việt"},
    {code:"vo",name:"Volapük",nativeName:"Volapük"},
    {code:"wa",name:"Walloon",nativeName:"Walon"},
    {code:"cy",name:"Welsh",nativeName:"Cymraeg"},
    {code:"wo",name:"Wolof",nativeName:"Wollof"},
    {code:"fy",name:"Western Frisian",nativeName:"Frysk"},
    {code:"xh",name:"Xhosa",nativeName:"isiXhosa"},
    {code:"yi",name:"Yiddish",nativeName:"ייִדיש"},
    {code:"yo",name:"Yoruba",nativeName:"Yorùbá"},
    {code:"za",name:"Zhuang, Chuang",nativeName:"Saɯ cueŋƅ, Saw cuengh"}
]

export const countries = [
    {name: "Afghanistan",code: "AF"},
    {name: "Åland Islands",code: "AX"},
    {name: "Albania",code: "AL"},
    {name: "Algeria",code: "DZ"},
    {name: "American Samoa",code: "AS"},
    {name: "Andorra",code: "AD"},
    {name: "Angola",code: "AO"},
    {name: "Anguilla",code: "AI"},
    {name: "Antarctica",code: "AQ"},
    {name: "Antigua & Barbuda",code: "AG"},
    {name: "Argentina",code: "AR"},
    {name: "Armenia",code: "AM"},
    {name: "Aruba",code: "AW"},
    {name: "Australia",code: "AU"},
    {name: "Austria",code: "AT"},
    {name: "Azerbaijan",code: "AZ"},
    {name: "Bahamas",code: "BS"},
    {name: "Bahrain",code: "BH"},
    {name: "Bangladesh",code: "BD"},
    {name: "Barbados",code: "BB"},
    {name: "Belarus",code: "BY"},
    {name: "Belgium",code: "BE"},
    {name: "Belize",code: "BZ"},
    {name: "Benin",code: "BJ"},
    {name: "Bermuda",code: "BM"},
    {name: "Bhutan",code: "BT"},
    {name: "Bolivia",code: "BO"},
    {name: "Caribbean Netherlands",code: "BQ"},
    {name: "Bosnia & Herzegovina",code: "BA"},
    {name: "Botswana",code: "BW"},
    {name: "Bouvet Island",code: "BV"},
    {name: "Brazil",code: "BR"},
    {name: "British Indian Ocean Territory",code: "IO"},
    {name: "Brunei",code: "BN"},
    {name: "Bulgaria",code: "BG"},
    {name: "Burkina Faso",code: "BF"},
    {name: "Burundi",code: "BI"},
    {name: "Cambodia",code: "KH"},
    {name: "Cameroon",code: "CM"},
    {name: "Canada",code: "CA"},
    {name: "Cape Verde",code: "CV"},
    {name: "Cayman Islands",code: "KY"},
    {name: "Central African Republic",code: "CF"},
    {name: "Chad",code: "TD"},
    {name: "Chile",code: "CL"},
    {name: "China",code: "CN"},
    {name: "Christmas Island",code: "CX"},
    {name: "Cocos (Keeling) Islands",code: "CC"},
    {name: "Colombia",code: "CO"},
    {name: "Comoros",code: "KM"},
    {name: "Congo - Brazzaville",code: "CG"},
    {name: "Congo - Kinshasa",code: "CD"},
    {name: "Cook Islands",code: "CK"},
    {name: "Costa Rica",code: "CR"},
    {name: "Côte d’Ivoire",code: "CI"},
    {name: "Croatia",code: "HR"},
    {name: "Cuba",code: "CU"},
    {name: "Curaçao",code: "CW"},
    {name: "Cyprus",code: "CY"},
    {name: "Czechia",code: "CZ"},
    {name: "Denmark",code: "DK"},
    {name: "Djibouti",code: "DJ"},
    {name: "Dominica",code: "DM"},
    {name: "Dominican Republic",code: "DO"},
    {name: "Ecuador",code: "EC"},
    {name: "Egypt",code: "EG"},
    {name: "El Salvador",code: "SV"},
    {name: "Equatorial Guinea",code: "GQ"},
    {name: "Eritrea",code: "ER"},
    {name: "Estonia",code: "EE"},
    {name: "Ethiopia",code: "ET"},
    {name: "Falkland Islands (Islas Malvinas)",code: "FK"},
    {name: "Faroe Islands",code: "FO"},
    {name: "Fiji",code: "FJ"},
    {name: "Finland",code: "FI"},
    {name: "France",code: "FR"},
    {name: "French Guiana",code: "GF"},
    {name: "French Polynesia",code: "PF"},
    {name: "French Southern Territories",code: "TF"},
    {name: "Gabon",code: "GA"},
    {name: "Gambia",code: "GM"},
    {name: "Georgia",code: "GE"},
    {name: "Germany",code: "DE"},
    {name: "Ghana",code: "GH"},
    {name: "Gibraltar",code: "GI"},
    {name: "Greece",code: "GR"},
    {name: "Greenland",code: "GL"},
    {name: "Grenada",code: "GD"},
    {name: "Guadeloupe",code: "GP"},
    {name: "Guam",code: "GU"},
    {name: "Guatemala",code: "GT"},
    {name: "Guernsey",code: "GG"},
    {name: "Guinea",code: "GN"},
    {name: "Guinea-Bissau",code: "GW"},
    {name: "Guyana",code: "GY"},
    {name: "Haiti",code: "HT"},
    {name: "Heard & McDonald Islands",code: "HM"},
    {name: "Vatican City",code: "VA"},
    {name: "Honduras",code: "HN"},
    {name: "Hong Kong",code: "HK"},
    {name: "Hungary",code: "HU"},
    {name: "Iceland",code: "IS"},
    {name: "India",code: "IN"},
    {name: "Indonesia",code: "ID"},
    {name: "Iran",code: "IR"},
    {name: "Iraq",code: "IQ"},
    {name: "Ireland",code: "IE"},
    {name: "Isle of Man",code: "IM"},
    {name: "Israel",code: "IL"},
    {name: "Italy",code: "IT"},
    {name: "Jamaica",code: "JM"},
    {name: "Japan",code: "JP"},
    {name: "Jersey",code: "JE"},
    {name: "Jordan",code: "JO"},
    {name: "Kazakhstan",code: "KZ"},
    {name: "Kenya",code: "KE"},
    {name: "Kiribati",code: "KI"},
    {name: "North Korea",code: "KP"},
    {name: "South Korea",code: "KR"},
    {name: "Kosovo",code: "XK"},
    {name: "Kuwait",code: "KW"},
    {name: "Kyrgyzstan",code: "KG"},
    {name: "Laos",code: "LA"},
    {name: "Latvia",code: "LV"},
    {name: "Lebanon",code: "LB"},
    {name: "Lesotho",code: "LS"},
    {name: "Liberia",code: "LR"},
    {name: "Libya",code: "LY"},
    {name: "Liechtenstein",code: "LI"},
    {name: "Lithuania",code: "LT"},
    {name: "Luxembourg",code: "LU"},
    {name: "Macao",code: "MO"},
    {name: "North Macedonia",code: "MK"},
    {name: "Madagascar",code: "MG"},
    {name: "Malawi",code: "MW"},
    {name: "Malaysia",code: "MY"},
    {name: "Maldives",code: "MV"},
    {name: "Mali",code: "ML"},
    {name: "Malta",code: "MT"},
    {name: "Marshall Islands",code: "MH"},
    {name: "Martinique",code: "MQ"},
    {name: "Mauritania",code: "MR"},
    {name: "Mauritius",code: "MU"},
    {name: "Mayotte",code: "YT"},
    {name: "Mexico",code: "MX"},
    {name: "Micronesia",code: "FM"},
    {name: "Moldova",code: "MD"},
    {name: "Monaco",code: "MC"},
    {name: "Mongolia",code: "MN"},
    {name: "Montenegro",code: "ME"},
    {name: "Montserrat",code: "MS"},
    {name: "Morocco",code: "MA"},
    {name: "Mozambique",code: "MZ"},
    {name: "Myanmar (Burma)",code: "MM"},
    {name: "Namibia",code: "NA"},
    {name: "Nauru",code: "NR"},
    {name: "Nepal",code: "NP"},
    {name: "Netherlands",code: "NL"},
    {name: "Curaçao",code: "AN"},
    {name: "New Caledonia",code: "NC"},
    {name: "New Zealand",code: "NZ"},
    {name: "Nicaragua",code: "NI"},
    {name: "Niger",code: "NE"},
    {name: "Nigeria",code: "NG"},
    {name: "Niue",code: "NU"},
    {name: "Norfolk Island",code: "NF"},
    {name: "Northern Mariana Islands",code: "MP"},
    {name: "Norway",code: "NO"},
    {name: "Oman",code: "OM"},
    {name: "Pakistan",code: "PK"},
    {name: "Palau",code: "PW"},
    {name: "Palestine",code: "PS"},
    {name: "Panama",code: "PA"},
    {name: "Papua New Guinea",code: "PG"},
    {name: "Paraguay",code: "PY"},
    {name: "Peru",code: "PE"},
    {name: "Philippines",code: "PH"},
    {name: "Pitcairn Islands",code: "PN"},
    {name: "Poland",code: "PL"},
    {name: "Portugal",code: "PT"},
    {name: "Puerto Rico",code: "PR"},
    {name: "Qatar",code: "QA"},
    {name: "Réunion",code: "RE"},
    {name: "Romania",code: "RO"},
    {name: "Russia",code: "RU"},
    {name: "Rwanda",code: "RW"},
    {name: "St. Barthélemy",code: "BL"},
    {name: "St. Helena",code: "SH"},
    {name: "St. Kitts & Nevis",code: "KN"},
    {name: "St. Lucia",code: "LC"},
    {name: "St. Martin",code: "MF"},
    {name: "St. Pierre & Miquelon",code: "PM"},
    {name: "St. Vincent & Grenadines",code: "VC"},
    {name: "Samoa",code: "WS"},
    {name: "San Marino",code: "SM"},
    {name: "São Tomé & Príncipe",code: "ST"},
    {name: "Saudi Arabia",code: "SA"},
    {name: "Senegal",code: "SN"},
    {name: "Serbia",code: "RS"},
    {name: "Serbia",code: "CS"},
    {name: "Seychelles",code: "SC"},
    {name: "Sierra Leone",code: "SL"},
    {name: "Singapore",code: "SG"},
    {name: "Sint Maarten",code: "SX"},
    {name: "Slovakia",code: "SK"},
    {name: "Slovenia",code: "SI"},
    {name: "Solomon Islands",code: "SB"},
    {name: "Somalia",code: "SO"},
    {name: "South Africa",code: "ZA"},
    {name: "South Georgia & South Sandwich Islands",code: "GS"},
    {name: "South Sudan",code: "SS"},
    {name: "Spain",code: "ES"},
    {name: "Sri Lanka",code: "LK"},
    {name: "Sudan",code: "SD"},
    {name: "Suriname",code: "SR"},
    {name: "Svalbard & Jan Mayen",code: "SJ"},
    {name: "Eswatini",code: "SZ"},
    {name: "Sweden",code: "SE"},
    {name: "Switzerland",code: "CH"},
    {name: "Syria",code: "SY"},
    {name: "Taiwan",code: "TW"},
    {name: "Tajikistan",code: "TJ"},
    {name: "Tanzania",code: "TZ"},
    {name: "Thailand",code: "TH"},
    {name: "Timor-Leste",code: "TL"},
    {name: "Togo",code: "TG"},
    {name: "Tokelau",code: "TK"},
    {name: "Tonga",code: "TO"},
    {name: "Trinidad & Tobago",code: "TT"},
    {name: "Tunisia",code: "TN"},
    {name: "Turkey",code: "TR"},
    {name: "Turkmenistan",code: "TM"},
    {name: "Turks & Caicos Islands",code: "TC"},
    {name: "Tuvalu",code: "TV"},
    {name: "Uganda",code: "UG"},
    {name: "Ukraine",code: "UA"},
    {name: "United Arab Emirates",code: "AE"},
    {name: "United Kingdom",code: "GB"},
    {name: "United States",code: "US"},
    {name: "U.S. Outlying Islands",code: "UM"},
    {name: "Uruguay",code: "UY"},
    {name: "Uzbekistan",code: "UZ"},
    {name: "Vanuatu",code: "VU"},
    {name: "Venezuela",code: "VE"},
    {name: "Vietnam",code: "VN"},
    {name: "British Virgin Islands",code: "VG"},
    {name: "U.S. Virgin Islands",code: "VI"},
    {name: "Wallis & Futuna",code: "WF"},
    {name: "Western Sahara",code: "EH"},
    {name: "Yemen",code: "YE"},
    {name: "Zambia",code: "ZM"},
    {name: "Zimbabwe",code: "ZW"}
];

export const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
        text?.length > 250 ?
            <p className="read-or-hide">
            {isReadMore ? text.slice(0, 180) : text}
            <span onClick={toggleReadMore} className="text">
                {isReadMore ? "... Read more" : " Show less"}
            </span>
            </p>
        :
            <p>{text}</p>
    );
};