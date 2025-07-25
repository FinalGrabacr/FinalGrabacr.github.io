class Wordle {
    constructor(config) {

        this.wordList = [
            "apple", "baker", "crane", "doubt", "eagle", "faint", "grape", "house", "igloo", "jolly", "knife",
            "lemon", "mango", "night", "ocean", "pizza", "queen", "river", "sugar", "table", "union", "vowel",
            "wagon", "yacht", "zebra", "amber", "bliss", "charm", "dream", "early", "flame", "glide", "honor",
            "irony", "jewel", "kudos", "light", "magic", "north", "olive", "pound", "quick", "round", "shine",
            "truth", "unity", "vivid", "witty", "xerox", "youth", "zesty", "arise", "blimp", "crave", "dwarf",
            "empty", "flirt", "glory", "hasty", "ideal", "jumps", "kites", "loyal", "mirth", "noisy", "opera",
            "plane", "quilt", "route", "spicy", "toast", "usual", "vague", "wound", "xenon", "yield", "zoned",
            "abide", "brave", "climb", "dryly", "extra", "funny", "great", "happy", "ivory", "jokes", "known",
            "laugh", "meant", "never", "often", "proud", "quiet", "rural", "sharp", "taken", "under", "value",
            "watch", "young", "zones", "aback", "abase", "abate", "abbey", "abbot", "abets", "abhor", "abide",
            "abler", "abode", "abort", "about", "above", "abuse", "abyss", "ached", "aches", "acids", "acing",
            "acked", "actor", "acute", "adage", "adapt", "addax", "added", "adder", "addle", "adept", "adieu",
            "adios", "admin", "admit", "adobe", "adopt", "adore", "adorn", "adult", "aegis", "aeros", "affix",
            "afire", "afoot", "afore", "afoul", "after", "again", "agate", "agave", "agent", "aging", "aglow",
            "agone", "agony", "agora", "agree", "agues", "ahead", "aided", "aides", "aimed", "aired", "aisle",
            "alarm", "album", "alder", "aleph", "alert", "algae", "alias", "alibi", "alien", "align", "alike",
            "alive", "alkyd", "allay", "alley", "allot", "allow", "alloy", "aloes", "aloft", "aloha", "alone",
            "along", "aloof", "aloud", "altar", "alter", "alway", "amahs", "amass", "amaze", "amber", "amble",
            "ameba", "amend", "amide", "amino", "amiss", "among", "amour", "amply", "amuse", "ancho", "angel",
            "anger", "angle", "angry", "angst", "anima", "anion", "anise", "ankhs", "ankle", "annex", "annoy",
            "annul", "anode", "anted", "antes", "antic", "antis", "anvil", "aorta", "apace", "apart", "aphid",
            "aping", "apnea", "apply", "apron", "aptly", "aquae", "aquas", "arbor", "arced", "ardor", "areas",
            "arena", "argon", "argot", "argue", "arias", "arise", "armed", "armor", "aroma", "arose", "array",
            "arrow", "arses", "artic", "artsy", "ashes", "aside", "asked", "askew", "aspen", "aspic", "assay",
            "asses", "asset", "atlas", "atoms", "atone", "attic", "audio", "audit", "auger", "aught", "augur",
            "aunts", "aurae", "aural", "auras", "autos", "avail", "avast", "avers", "avert", "avian", "avoid",
            "avows", "await", "awake", "award", "aware", "awash", "awful", "awing", "awoke", "axial", "axing",
            "axiom", "axles", "axons", "azure", "babel", "babes", "backs", "bacon", "badge", "badly", "bagel",
            "baggy", "bails", "bairn", "baits", "baked", "baker", "bakes", "balds", "baled", "bales", "balks",
            "balls", "bally", "balms", "balmy", "balsa", "banal", "bands", "bandy", "banes", "bangs", "banjo",
            "banks", "barbs", "bards", "bared", "barer", "bares", "barge", "barks", "barns", "baron", "barre",
            "basal", "based", "baser", "bases", "basic", "basil", "basin", "basis", "basks", "baste", "batch",
            "bated", "bates", "bathe", "baths", "baton", "batty", "bauds", "bawds", "bawls", "bayed", "bayou",
            "beach", "beads", "beady", "beams", "beans", "beard", "bears", "beast", "beats", "beaus", "beaux",
            "bebop", "bedsore", "beech", "beefs", "beefy", "beeps", "beers", "beery", "beets", "befit", "befog",
            "began", "begat", "begem", "begin", "begot", "begun", "beige", "being", "belay", "belch", "belie",
            "belle", "bells", "belly", "below", "belts", "bench", "bends", "bendy", "bents", "beret", "bergs",
            "berry", "berth", "bests", "betas", "betel", "bevel", "bezel", "bhang", "bias", "bible", "biddy",
            "bided", "bides", "bight", "bigot", "bijou", "bikes", "biles", "bilge", "bills", "billy", "binge",
            "bingo", "biped", "birch", "birds", "birth", "bison", "bitch", "biter", "bites", "bitsy", "bitty",
            "black", "blade", "blame", "bland", "blank", "blare", "blast", "blaze", "bleak", "bleat", "bleed",
            "blend", "bless", "blest", "blimp", "blind", "bling", "blini", "blink", "blips", "bliss", "blitz",
            "bloat", "blobs", "block", "blocs", "bloke", "blond", "blood", "bloom", "bloop", "blots", "blown",
            "blows", "blued", "blues", "bluff", "blunt", "blurb", "blurs", "blurt", "blush", "board", "boars",
            "boast", "boats", "bobby", "bodes", "bodge", "boffo", "bogey", "boggy", "bogie", "bogus", "boils",
            "bolas", "boles", "bolls", "bolts", "bonds", "bones", "boney", "bongo", "bongs", "bonks", "bonny",
            "bonus", "booby", "booed", "books", "booms", "boons", "boors", "boost", "booth", "boots", "booty",
            "booze", "boozy", "borax", "bored", "bores", "boric", "borne", "boron", "bosom", "bossy", "botch",
            "bough", "bound", "bouts", "bowel", "bower", "bowls", "boxer", "boxes", "brace", "brags", "braid",
            "brain", "brake", "brand", "brass", "brats", "brave", "bravo", "brawl", "brawn", "brays", "bread",
            "break", "bream", "breed", "brent", "brews", "briar", "bribe", "brick", "bride", "brief", "brier",
            "brigs", "brims", "brine", "bring", "brink", "briny", "brisk", "broad", "broil", "broks", "brood",
            "brook", "broom", "broth", "brown", "brows", "bruce", "bruit", "brung", "brush", "brusk", "brute",
            "bucks", "buddy", "budge", "buffs", "buggy", "bugle", "build", "built", "bulbs", "bulge", "bulgy",
            "bulks", "bulky", "bulls", "bully", "bumps", "bumpy", "bunch", "bunks", "bunny", "bunts", "buoys",
            "burls", "burly", "burns", "burnt", "burps", "burro", "burrs", "bursa", "burst", "busby", "bused",
            "buses", "bushy", "busts", "busty", "butch", "butte", "buxom", "buyer", "bylaw", "bytes", "byway",
            "cabal", "cabby", "cabin", "cable", "cacao", "cache", "cacti", "caddy", "cadet", "cafes", "caged",
            "cages", "cagey", "cairn", "caked", "cakes", "calfs", "calix", "calks", "calla", "calls", "calms",
            "calve", "camel", "cameo", "camps", "campy", "canal", "candy", "caned", "canes", "canny", "canoe",
            "canon", "caped", "caper", "capes", "capon", "capos", "cards", "cared", "cares", "caret", "cargo",
            "carls", "carom", "carps", "carry", "carts", "carve", "cased", "cases", "casks", "caste", "casts",
            "catch", "cater", "catty", "caulk", "cause", "caved", "caves", "cavil", "cease", "cecal", "cedar",
            "ceded", "cedes", "celeb", "cello", "cells", "cents", "ceres", "certs", "chads", "chafe", "chaff",
            "chain", "chair", "chalk", "champ", "chant", "chaos", "chaps", "charm", "chars", "chart", "chase",
            "chasm", "chats", "cheap", "cheat", "check", "cheek", "cheep", "cheer", "chefs", "chess", "chest",
            "chews", "chewy", "chick", "chide", "child", "chile", "chill", "chime", "chimp", "china", "chins",
            "chips", "chirp", "chits", "chive", "chock", "choir", "choke", "chops", "chord", "chore", "chose",
            "chows", "chuck", "chugs", "chump", "chums", "chunk", "churn", "chute", "cider", "cigar", "cilia",
            "cindy", "cinch", "cions", "circa", "cited", "cites", "civet", "civic", "civil", "clack", "claim",
            "clamp", "clams", "clang", "clank", "claps", "clash", "clasp", "class", "claws", "clean", "clear",
            "cleat", "clefs", "cleft", "clerk", "click", "cliff", "climb", "clime", "cling", "clink", "clips",
            "cloak", "clock", "clods", "clogs", "clomp", "clone", "close", "cloth", "clots", "cloud", "clout",
            "clove", "clown", "cloys", "clubs", "cluck", "clued", "clues", "clump", "clung", "coach", "coals",
            "coast", "coats", "cobra", "cocks", "cocky", "cocoa", "codas", "coded", "coder", "codes", "codex",
            "coeds", "coils", "coins", "cokes", "colas", "colds", "coles", "colic", "colon", "color", "colts",
            "comas", "combo", "comes", "comet", "comfy", "comic", "comma", "conch", "cones", "conga", "conic",
            "cooed", "cooks", "cools", "coops", "coots", "coped", "copes", "copra", "copse", "coral", "cords",
            "cores", "corgi", "corks", "corms", "corns", "corps", "corse", "costs", "couch", "cough", "could",
            "count", "coupe", "court", "coven", "cover", "coves", "covet", "cowed", "cower", "cowls", "coxed",
            "coxes", "coyly", "crabs", "crack", "craft", "crags", "cramp", "crams", "crane", "crank", "crape",
            "crash", "crass", "crate", "crave", "crawl", "craws", "craze", "crazy", "creak", "cream", "credo",
            "creed", "creek", "creel", "crepe", "crept", "cress", "crest", "crews", "cribs", "crick", "cried",
            "cries", "crime", "crimp", "crisp", "crits", "croak", "crock", "crocs", "croft", "crone", "crony",
            "crook", "cross", "croup", "crowd", "crown", "crows", "crude", "cruel", "cruet", "crumb", "crump",
            "crush", "crust", "crypt", "cubed", "cubes", "cubic", "cuffs", "culms", "cults", "cumin", "cupid",
            "curbs", "curds", "cured", "curer", "cures", "curia", "curio", "curls", "curly", "curry", "curse",
            "curve", "curvy", "cushy", "cuter", "cutie", "cutup", "cycad", "cycle", "cynic", "cysts", "dacha",
            "daddy", "daffy", "daily", "dairy", "daisy", "dales", "dames", "damps", "dance", "dandy", "dared",
            "dares", "darks", "darns", "darts", "dashy", "dated", "dates", "datum", "daubs", "daunt", "dawns",
            "dazed", "dazes", "deals", "dealt", "deans", "dears", "death", "debar", "debit", "debts", "debug",
            "debut", "decaf", "decal", "decay", "decks", "decor", "decoy", "decry", "deeds", "deems", "deeps",
            "defer", "deity", "deked", "dekes", "delay", "dells", "delta", "delve", "demos", "demur", "denim",
            "dense", "dents", "depot", "depth", "derby", "desks", "deter", "detox", "deuce", "devil", "dewed",
            "dewey", "dhows", "dials", "diary", "diced", "dices", "dicey", "dicky", "diets", "digit", "dikes",
            "dills", "dilly", "dimer", "dimes", "dimly", "dinar", "dined", "diner", "dines", "dingy", "diode",
            "dirge", "dirty", "discs", "disks", "ditch", "ditto", "ditty", "divan", "divas", "dived", "diver",
            "dives", "divot", "divvy", "dizzy", "djinn", "docks", "dodge", "dodgy", "doers", "doffs", "dogma",
            "doily", "doing", "dolls", "dolly", "domes", "donny", "donor", "donut", "dooms", "doors", "doped",
            "doper", "dopes", "dopey", "dosed", "doses", "doter", "dotes", "dozed", "dozen", "dozes", "draft",
            "drags", "drain", "drake", "drama", "drank", "drape", "drawl", "drawn", "draws", "drays", "dread",
            "dream", "dregs", "dress", "dried", "drier", "dries", "drift", "drill", "drily", "drink", "drips",
            "drive", "droll", "drome", "drone", "drool", "droop", "drops", "dross", "drove", "drown", "drubs",
            "drugs", "druid", "drums", "drunk", "dryad", "dryer", "dryly", "ducal", "duces", "duchy", "ducks",
            "ducky", "ducts", "duels", "duets", "duffs", "dukes", "dully", "dumbo", "dummy", "dumps", "dumpy",
            "dunce", "dunes", "dunks", "duped", "dupes", "duple", "durable", "dusky", "dusty", "dutch", "dwarf",
            "dwell", "dwelt", "dyads", "dying", "eager", "eagle", "eared", "earls", "early", "earns", "earth",
            "eased", "easel", "eases", "easts", "eaten", "eater", "eaves", "ebbed", "ebony", "eclat", "edged",
            "edger", "edges", "edict", "edify", "eerie", "egged", "egret", "eider", "eight", "eject", "elate",
            "elbow", "elder", "elect", "elegy", "elfin", "elite", "elope", "elude", "elves", "emcee", "emery",
            "empty", "enact", "ended", "endow", "enema", "enemy", "enjoy", "ennui", "enter", "entry", "envoy",
            "eosin", "epoch", "epoxy", "equal", "equip", "erase", "erect", "ergot", "erode", "erred", "error",
            "erupt", "essay", "ester", "ether", "ethic", "ethos", "etude", "evade", "evens", "event", "every",
            "evict", "evil", "evoke", "exact", "exalt", "exams", "excel", "exert", "exile", "exist", "expel",
            "extol", "extra", "exude", "exult", "exurb", "eying", "fable", "faced", "facer", "faces", "facet",
            "facts", "faded", "fades", "fails", "faint", "faire", "fairy", "faith", "faked", "faker", "fakes",
            "falls", "false", "famed", "fancy", "fangs", "farce", "fared", "fares", "farms", "fasts", "fatal",
            "fated", "fates", "fatty", "fault", "fauna", "fauns", "favas", "favor", "fazed", "fazes", "fears",
            "feast", "feats", "fecal", "feeds", "feels", "feign", "feint", "fells", "felon", "femur", "fence",
            "fends", "feral", "ferry", "fetal", "fetch", "fetid", "fetus", "feuds", "fever", "fewer", "fiber",
            "fichu", "ficus", "fiefs", "field", "fiend", "fiery", "fifth", "fifty", "fight", "filch", "filed",
            "filer", "files", "fills", "filly", "films", "filmy", "filter", "final", "finch", "finds", "fined",
            "finer", "fines", "finks", "finny", "firms", "first", "fishy", "fists", "fixed", "fixer", "fixes",
            "fizzy", "fjord", "flack", "flags", "flail", "flair", "flake", "flaky", "flame", "flank", "flaps",
            "flare", "flash", "flask", "flats", "flaws", "flays", "flead", "fleas", "fleck", "flees", "fleet",
            "flesh", "flick", "flied", "flies", "fling", "flint", "flips", "flirt", "float", "flock", "flops",
            "flora", "floss", "flour", "flout", "flown", "flows", "flubs", "flues", "fluff", "fluid", "fluke",
            "fluky", "flume", "flung", "flunk", "flush", "flute", "flyby", "foams", "foamy", "focal", "focus",
            "foggy", "foils", "foist", "folds", "folio", "folks", "folly", "fonda", "fonts", "foods", "fools",
            "foots", "foray", "force", "fords", "forge", "forgo", "forks", "forma", "forms", "forte", "forth",
            "forts", "forty", "forum", "fossa", "fouls", "found", "fount", "fours", "fowls", "foxes", "foyer",
            "frags", "frail", "frame", "franc", "frank", "frash", "fraud", "fraus", "frays", "freak", "fresh",
            "frets", "friar", "fried", "frier", "fries", "frigs", "frill", "frisk", "frock", "frogs", "frond",
            "front", "frost", "froth", "frown", "froze", "fruit", "fryer", "fucks", "fuels", "fugue", "fully",
            "fumes", "fumes", "funds", "fungi", "funk", "funny", "furls", "furry", "furze", "fussy", "fusty",
            "futon", "fuzes", "fuzzy", "gabby", "gable", "gaffe", "gaffs", "gages", "gains", "gaits", "gales",
            "galls", "gamba", "gamer", "games", "gamma", "gangs", "gaped", "gapes", "gappy", "garbs", "garde",
            "gases", "gasps", "gassy", "gated", "gates", "gator", "gaudy", "gauge", "gault", "gaunt", "gauze",
            "gavel", "gawks", "gawky", "gays", "gazed", "gazer", "gazes", "gears", "gecko", "geese", "gelds",
            "gelly", "gem", "genus", "germs", "gesso", "ghost", "ghoul", "giant", "giddy", "gifts", "gilds",
            "gills", "gimpy", "ginny", "gipsy", "girds", "girls", "girly", "girth", "given", "giver", "gives",
            "glade", "glads", "gland", "glare", "glass", "glaze", "gleam", "glean", "glees", "glens", "glide",
            "glims", "glint", "glitz", "gloat", "globe", "globs", "gloom", "glory", "gloss", "glove", "glows",
            "glued", "glues", "glums", "gnarl", "gnash", "gnats", "gnaws", "gnome", "goads", "goals", "goats",
            "godly", "gofer", "golds", "golem", "golfs", "golly", "gonad", "gongs", "goody", "gooey", "goofs",
            "goofy", "goons", "goose", "gored", "gores", "gorge", "gorse", "gourd", "gouts", "gouty", "grace",
            "grade", "grads", "graft", "grail", "grain", "grams", "grand", "grant", "grape", "graph", "grasp",
            "grass", "grate", "grave", "gravy", "graze", "great", "greed", "green", "greet", "greys", "grids",
            "grief", "grill", "grime", "grimy", "grind", "grins", "gripe", "grips", "grist", "grits", "groan",
            "groin", "gross", "grots", "group", "grout", "grove", "growl", "grown", "grows", "grubs", "gruff",
            "grump", "grunt", "guard", "guava", "guess", "guest", "guide", "guild", "guile", "guilt", "guise",
            "gulch", "gulfs", "gulls", "gully", "gulps", "gumbo", "gummy", "gunks", "gunny", "gurus", "gushy",
            "gusto", "gusts", "gusty", "gutsy", "guyed", "habit", "hacks", "hafts", "haiku", "hails", "hairs",
            "hairy", "haled", "hales", "hallo", "halls", "halos", "halts", "halve", "hands", "handy", "hangs",
            "hanks", "hardy", "hares", "harks", "harms", "harps", "harry", "harsh", "harts", "hasps", "haste",
            "hasty", "hatch", "hated", "hater", "hates", "hauls", "haunt", "haven", "haves", "havoc", "hawed",
            "hawks", "hazel", "hazed", "hazes", "heads", "heals", "heaps", "heard", "hears", "heart", "heath",
            "heats", "heave", "heavy", "hedge", "heels", "hefts", "hefty", "heirs", "heist", "helix", "hello",
            "helm", "helps", "hence", "herbs", "herds", "heres", "heron", "hertz", "hewed", "hexed", "hexes",
            "hicks", "hides", "highs", "hills", "hilly", "hilts", "hindi", "hinge", "hints", "hippo", "hires",
            "hired", "hitch", "hives", "hoagy", "hoard", "hoars", "hoary", "hobby", "hobos", "hocks", "hogan",
            "hoist", "holds", "holes", "holey", "holly", "homed", "homer", "homes", "homey", "honed", "hones",
            "honey", "honks", "honor", "hoods", "hoody", "hooey", "hooks", "hooky", "hoops", "hoots", "hoped",
            "hopes", "horde", "horns", "horse", "horsy", "hosed", "hoses", "hosts", "hotel", "hotly", "hound",
            "hours", "house", "hovel", "hover", "howdy", "howls", "huber", "huffs", "huffy", "hulks", "hulky",
            "hulls", "human", "humid", "humor", "hump", "humps", "humus", "hunch", "hunks", "hunky", "hunts",
            "hurds", "hurls", "hurry", "hurst", "hurts", "husky", "hussy", "hutch", "hydra", "hydro", "hyena",
            "hymns", "hyped", "hypes", "hypos", "iambs", "icers", "icing", "icons", "ideal", "ideas", "idiom",
            "idiot", "idled", "idler", "idles", "idols", "igloo", "ikons", "ileum", "iliac", "image", "imago",
            "impel", "impl", "inane", "inapt", "inbox", "incur", "index", "indie", "ingot", "inked", "inlay",
            "inlet", "inner", "input", "inset", "inter", "int", "intro", "inure", "ioctl", "ionic", "irate",
            "irked", "irons", "irony", "isled", "isles", "islet", "issue", "itchy", "items", "ivies", "ivory",
            "jabot", "jacks", "jaded", "jades", "jails", "jambs", "jams", "japan", "japed", "japes", "jassy",
            "jaunt", "jawed", "jazzy", "jeans", "jeeps", "jeers", "jelly", "jemmy", "jenny", "jerks", "jerky",
            "jerry", "jests", "jetty", "jewel", "jibed", "jibes", "jiffy", "jihad", "jilts", "jimmy", "jingo",
            "jinni", "jinns", "jived", "jives", "joins", "joint", "joist", "joked", "joker", "jokes", "jolly",
            "jolts", "joule", "joust", "jowls", "jowly", "judge", "judgy", "juice", "juicy", "jujus", "jukes",
            "jumbo", "jumps", "jumpy", "junks", "junky", "junta", "junto", "juror", "karma", "kefir", "kelly",
            "kenaf", "khaki", "kicks", "kiddy", "kievs", "kills", "kilts", "kinda", "kinds", "kings", "kinks",
            "kinky", "kiosk", "kited", "kites", "kitty", "knack", "knave", "knead", "kneel", "knell", "knelt",
            "knife", "knits", "knobs", "knock", "knoll", "knots", "known", "knows", "koala", "kudos", "labor",
            "laced", "laces", "lacks", "laden", "ladle", "lager", "lairs", "laity", "lamed", "lames", "lamps",
            "lance", "lands", "lanky", "lapel", "lapse", "larch", "lards", "lardy", "large", "larks", "larva",
            "lased", "laser", "lases", "lasso", "lasts", "latch", "later", "latex", "laths", "lathe", "latter",
            "lauds", "laugh", "lavas", "lawns", "laxly", "layup", "lazed", "lazes", "leach", "leads", "leafs",
            "leafy", "leans", "leaps", "leapt", "learn", "lease", "leash", "least", "leave", "ledge", "leech",
            "leeks", "leers", "leery", "lefts", "lefty", "legal", "leggy", "lemma", "lemon", "lemur", "lends",
            "lense", "leper", "level", "lever", "liars", "libel", "licks", "lidos", "liege", "liens", "lifts",
            "light", "liked", "liken", "likes", "limbs", "limbo", "limed", "limes", "limey", "limit", "limps",
            "lined", "linen", "liner", "lines", "lingo", "links", "lints", "linty", "lions", "lipid", "lists",
            "litch", "liter", "lithe", "lived", "liver", "lives", "livid", "llama", "loads", "loafs", "loamy",
            "loans", "loath", "lobby", "lobed", "lobes", "local", "locks", "locus", "lodge", "loess", "lofts",
            "lofty", "logic", "login", "logos", "loins", "lolls", "loner", "longs", "looks", "looms", "loons",
            "loony", "loops", "loopy", "loose", "loots", "loped", "lopes", "lords", "lorry", "loser", "loses",
            "lossy", "lotus", "louse", "lousy", "loved", "lover", "loves", "lowed", "lower", "lowly", "lucid",
            "lucky", "lucre", "lulls", "lumen", "lumps", "lumpy", "lunar", "lunch", "lunge", "lungs", "lurch",
            "lured", "lures", "lurid", "lusts", "lusty", "lutes", "luxur", "lycra", "lying", "lymph", "lynch",
            "lyres", "lyric", "macaw", "macho", "macro", "madam", "madly", "mafia", "magic", "magma", "maids",
            "mails", "maims", "mains", "major", "maker", "makes", "malls", "malts", "mamas", "mambo", "mamma",
            "mange", "mango", "mangy", "mania", "manic", "manly", "manna", "manor", "mansa", "maple", "maras",
            "march", "mares", "marge", "marks", "marry", "marsh", "masks", "mason", "masse", "match", "mated",
            "mates", "maths", "matte", "mauve", "maxed", "maxes", "maxim", "maybe", "mayor", "mazes", "meals",
            "mealy", "means", "meant", "meats", "medals", "media", "medic", "meets", "melon", "melts", "menus",
            "mercy", "merge", "merit", "merry", "messy", "metal", "meted", "meter", "metes", "meths", "metro",
            "mewls", "micas", "midst", "midge", "midis", "might", "mikes", "milch", "miles", "milks", "milky",
            "mills", "mimes", "mimic", "mince", "minds", "mined", "miner", "mines", "minim", "minor", "minty",
            "minus", "mired", "mires", "mirth", "miser", "misps", "missy", "mists", "misty", "mites", "mitre",
            "mixed", "mixer", "mixes", "moans", "moats", "mocks", "modes", "model", "modem", "moist", "molar",
            "molds", "moldy", "moles", "molls", "molly", "molts", "money", "monks", "month", "mooch", "moods",
            "moody", "mooed", "moons", "moors", "moose", "moots", "mopes", "moped", "moral", "moray", "morel",
            "mores", "morns", "morph", "morts", "mosey", "mossy", "motel", "motes", "moths", "motif", "motor",
            "motto", "mound", "mount", "mourn", "mouse", "mousy", "mouth", "moved", "mover", "moves", "movie",
            "mowed", "mower", "mucks", "mucky", "mucus", "muddy", "muffs", "muggy", "mulch", "mulct", "mules",
            "mummy", "mumps", "munch", "munge", "mural", "murks", "murky", "muses", "mushy", "music", "musky",
            "musty", "muted", "mutes", "mutts", "myrrh", "nabob", "nacho", "nacre", "nadir", "nails", "naive",
            "naked", "named", "names", "nanny", "napes", "nappy", "nasal", "nasty", "natal", "naves", "navel",
            "nears", "neath", "necks", "needs", "needy", "neigh", "nerdy", "nerve", "nervy", "nests", "netty",
            "newel", "newer", "newly", "newsy", "nicer", "niche", "nicks", "niece", "nighs", "night", "nimbi",
            "nines", "ninny", "ninth", "nippy", "nisei", "niter", "nites", "nitro", "nixed", "nixes", "noble",
            "nobly", "nodal", "nodes", "noise", "noisy", "nomad", "nonce", "nones", "nooks", "nooky", "noons",
            "noose", "norms", "north", "nosed", "noses", "nosey", "notch", "notes", "nouns", "novel", "nudes",
            "nudge", "nuked", "nukes", "nulls", "numbs", "nurse", "nutty", "nylon", "oaken", "oases", "oasis",
            "oaten", "oaths", "obese", "obeys", "obits", "oboes", "occur", "ocean", "ochre", "octal", "octet",
            "odder", "oddly", "odeon", "odium", "odors", "offal", "offer", "often", "ogled", "ogles", "ogres",
            "oiled", "oinks", "okays", "older", "oldie", "oleic", "oleos", "oligo", "olive", "omega", "omens",
            "omits", "onion", "onset", "oohs", "oomph", "opera", "opine", "opium", "opted", "optic", "orate",
            "orbit", "order", "oreos", "organ", "other", "otter", "ought", "ounce", "our", "ousts", "outdo",
            "outed", "outer", "outgo", "ovals", "ovary", "ovate", "overt", "ovine", "ovoid", "owing", "owlet",
            "owned", "owner", "oxide", "ozone", "paced", "paces", "packs", "pacts", "paddy", "pagan", "paged",
            "pager", "pages", "pains", "paint", "pairs", "paled", "paler", "pales", "palls", "palms", "palmy",
            "palsy", "panda", "panel", "panes", "pangs", "panic", "pansy", "pants", "papal", "papas", "paper",
            "parch", "pared", "pares", "parka", "parks", "parry", "parse", "parts", "party", "pas", "passy",
            "pasta", "paste", "pasty", "patch", "pated", "patel", "pates", "paths", "patio", "patsy", "pause",
            "paved", "paves", "pawed", "pawns", "peace", "peach", "peaks", "peals", "pearl", "pecan", "pecks",
            "pedal", "peeks", "peels", "peeps", "peers", "peggy", "peked", "pekes", "pelts", "penal", "pence",
            "penny", "peons", "peony", "perch", "peril", "perks", "perky", "perms", "pesky", "pests", "petal",
            "peter", "petty", "phase", "phlox", "phone", "phony", "photo", "phyla", "piano", "picks", "picky",
            "picts", "piece", "piers", "piety", "piggy", "pikes", "pilaf", "piled", "piles", "pills", "pilot",
            "pimps", "pinch", "pined", "pines", "pinko", "pinks", "pinky", "pinot", "pipes", "piped", "piper",
            "pique", "pitch", "pithy", "pivot", "pixel", "pixy", "place", "plaid", "plain", "plait", "plane",
            "plank", "plans", "plant", "plats", "plate", "plays", "plaza", "plead", "pleas", "pleat", "plebs",
            "plies", "plods", "plonk", "plops", "plots", "plows", "pluck", "plugs", "plumb", "plume", "plump",
            "plums", "plumy", "plunk", "plush", "poach", "podgy", "poems", "poets", "point", "poise", "poked",
            "poker", "pokes", "polar", "poled", "poles", "polls", "polly", "polos", "pomps", "ponds", "pones",
            "pooch", "poohs", "pools", "poops", "poopy", "popes", "poppy", "porch", "pored", "pores", "ports",
            "posey", "posed", "poser", "poses", "posse", "posts", "potty", "pouch", "pound", "pours", "power",
            "prams", "prank", "prats", "pratt", "prays", "preen", "preps", "press", "preys", "price", "prick",
            "pride", "pried", "prier", "pries", "prime", "prims", "print", "prior", "prise", "prism", "privy",
            "prize", "prods", "prone", "prong", "proof", "props", "prose", "proud", "prove", "prowl", "prows",
            "proxy", "prude", "prune", "psalm", "pshaw", "pucks", "pudgy", "puffs", "puffy", "pulpy", "pulse",
            "pumas", "punch", "punks", "punky", "punts", "pupae", "pupal", "pupil", "puppy", "puree", "purer",
            "purge", "purls", "purse", "pushy", "putts", "pygmy", "pylon", "qanat", "quack", "quads", "quail",
            "quake", "qualm", "quark", "quart", "quash", "quasi", "quays", "queen", "quell", "query", "quest",
            "queue", "quick", "quids", "quiet", "quiff", "quill", "quilt", "quint", "quips", "quire", "quirk",
            "quirt", "quite", "quits", "quoth", "quota", "quote", "quoth", "rabid", "raced", "racer", "races",
            "racks", "radar", "radii", "radio", "rafts", "raged", "rages", "raids", "rails", "rains", "rainy",
            "raise", "raked", "rakes", "rally", "ramps", "ranch", "randy", "range", "rangy", "ranks", "rants",
            "raped", "raper", "rapes", "rapid", "rared", "rarer", "rares", "rasps", "raspy", "rates", "rated",
            "ratio", "ratty", "raved", "ravel", "raven", "raves", "rawer", "razed", "razes", "reach", "react",
            "reads", "ready", "realm", "reams", "reaps", "rearm", "rebel", "rebid", "rebus", "rebut", "recap",
            "recut", "redly", "redox", "reeds", "reedy", "reefs", "reefs", "reels", "refer", "refit", "regal",
            "regma", "rehab", "reign", "reins", "reiss", "relay", "relax", "relay", "relic", "remit", "renal",
            "rends", "renew", "rente", "repay", "repel", "reply", "repro", "reran", "rerun", "reset", "resin",
            "retch", "retie", "retry", "reuse", "revel", "revue", "rewan", "rewax", "rewed", "rewet", "rheas",
            "rheum", "rhino", "rhyme", "rials", "ribby", "ricks", "rides", "rider", "ridge", "riffs", "rifle",
            "rifts", "right", "rigid", "rigor", "riled", "riles", "rille", "rills", "rimed", "rimes", "ringa",
            "rings", "rinse", "riots", "ripen", "ripes", "rises", "riser", "risky", "rites", "ritzy", "rival",
            "riven", "river", "rivet", "roach", "roads", "roams", "roans", "roars", "roast", "robed", "robes",
            "robin", "robot", "rocks", "rocky", "rodeo", "roers", "rogue", "roils", "roily", "roles", "rolls",
            "roman", "romps", "rondo", "roods", "roofs", "rooks", "roomy", "roost", "roots", "roped", "roper",
            "ropes", "roses", "rosin", "rotor", "rouge", "rough", "round", "rouse", "roust", "route", "routs",
            "roved", "rover", "roves", "rowan", "rowdy", "rowed", "rowel", "rower", "royal", "rubby", "rubel",
            "rubes", "ruble", "ruddy", "ruder", "rudgy", "rueds", "ruffs", "rugby", "ruins", "ruled", "ruler",
            "rules", "rumba", "rumps", "runes", "rungs", "runny", "runts", "rupee", "rural", "ruses", "rushy",
            "rusts", "rusty", "saber", "sable", "sacks", "sadly", "safer", "safes", "sagas", "sager", "sages",
            "sahib", "sails", "saint", "saith", "salad", "sally", "salol", "salons", "salsa", "salts", "salty",
            "salve", "salvo", "samba", "sands", "sandy", "saner", "sappy", "saran", "saree", "sarge", "sarin",
            "saris", "sassy", "sated", "sates", "satin", "satyr", "sauce", "saucy", "sauna", "saves", "saved",
            "savor", "savoy", "savvy", "sawed", "scads", "scald", "scale", "scalp", "scaly", "scamp", "scans",
            "scant", "scare", "scarf", "scars", "scary", "scats", "scene", "scent", "schmo", "schwa", "scion",
            "scoop", "scope", "score", "scorn", "scour", "scout", "scowl", "scows", "scram", "scrap", "scree",
            "screw", "scrub", "scrum", "scuba", "scull", "seals", "seams", "seamy", "seats", "sebum", "sects",
            "sedan", "sedge", "seeds", "seedy", "seeks", "seems", "seeps", "seers", "segno", "segue", "seize",
            "sells", "sends", "sense", "sepal", "sepia", "serfs", "serge", "serif", "serum", "serve", "setup",
            "seven", "sever", "sewed", "sewer", "sexes", "shack", "shade", "shady", "shaft", "shags", "shahs",
            "shake", "shaky", "shale", "shall", "shalt", "shame", "shams", "shank", "shape", "shard", "share",
            "shark", "sharp", "shave", "shawl", "sheaf", "shear", "sheen", "sheep", "sheer", "sheet", "sheik",
            "shelf", "shell", "shift", "shill", "shins", "shirk", "shirt", "shits", "shoal", "shock", "shoes",
            "shone", "shook", "shoots", "shops", "shore", "shorn", "short", "shots", "shove", "shown", "shows",
            "shred", "shrew", "shrub", "shrug", "shunt", "shush", "shuts", "sicks", "sided", "sides", "sidle",
            "siege", "sifts", "sighs", "sight", "signs", "silks", "silky", "silly", "silos", "silts", "silty",
            "since", "sinew", "singe", "sings", "sinks", "sinus", "sipes", "sired", "siren", "sires", "sissy",
            "sitar", "sited", "sites", "sixes", "sixth", "sixty", "sized", "sizer", "sizes", "skate", "skeet",
            "skein", "skews", "skiff", "skill", "skimp", "skims", "skins", "skips", "skirl", "skirt", "skits",
            "skulk", "skull", "skunk", "slabs", "slack", "slags", "slain", "slake", "slams", "slang", "slant",
            "slaps", "slash", "slate", "slats", "slave", "sleek", "sleep", "sleet", "slept", "slice", "slick",
            "slide", "slier", "slight", "slily", "slime", "slimy", "sling", "slink", "slips", "slits", "sloop",
            "slope", "slops", "slosh", "slots", "sloth", "slump", "slung", "slunk", "slurp", "slurs", "slush",
            "sluts", "smack", "small", "smart", "smash", "smear", "smell", "smelt", "smile", "smirk", "smite",
            "smith", "smock", "smoke", "smoky", "smote", "smuts", "snack", "snafu", "snags", "snail", "snake",
            "snaky", "snaps", "snare", "snarl", "snash", "snath", "sneak", "sneck", "sniff", "snips", "snits",
            "snobs", "snoop", "snore", "snort", "snots", "snout", "snows", "snowy", "snubs", "snuck", "snuff",
            "soaks", "soaps", "soapy", "soars", "sober", "socks", "sodas", "sofas", "softs", "soft", "soggy",
            "soils", "soles", "solid", "solve", "songs", "sonic", "sonny", "sooth", "sophi", "sorer", "sores",
            "sorry", "sorts", "souls", "sound", "soups", "soupy", "sours", "souse", "south", "sowed", "sower",
            "space", "spade", "spans", "spare", "spark", "spars", "spasm", "spate", "spawn", "spays", "speak",
            "spear", "specs", "speed", "spell", "spelt", "spend", "spent", "sperm", "spice", "spicy", "spied",
            "spiel", "spier", "spies", "spike", "spiky", "spill", "spilt", "spine", "spins", "spiny", "spire",
            "spite", "spits", "splat", "splay", "split", "spoil", "spoke", "spoof", "spook", "spools", "spoon",
            "spore", "sport", "spots", "spout", "sprat", "spray", "spree", "sprig", "sprit", "spuds", "spunk",
            "spurn", "spurt", "squab", "squad", "squat", "squid", "stabs", "stack", "staff", "stage", "stags",
            "stain", "stair", "stake", "stale", "stalk", "stall", "stamp", "stand", "stank", "stare", "stark",
            "stars", "start", "stash", "state", "stats", "stave", "stays", "stead", "steak", "steal", "steam",
            "steed", "steel", "steep", "steer", "stems", "steps", "stern", "stews", "stick", "sties", "stiff",
            "stile", "still", "stilt", "sting", "stink", "stint", "stirs", "stoic", "stoke", "stole", "stomp",
            "stone", "stony", "stood", "stool", "stoop", "stops", "store", "stork", "storm", "story", "stout",
            "stove", "stows", "strap", "straw", "stray", "strep", "strew", "strip", "strum", "strut", "stubs",
            "stuck", "studs", "study", "stuff", "stump", "stung", "stunk", "stuns", "stunt", "style", "suave",
            "sucks", "sugar", "suits", "sulks", "sulky", "sully", "sumac", "sunny", "super", "surer", "surfs",
            "surge", "surer", "surly", "sushi", "swabs", "swags", "swami", "swamp", "swank", "swans", "swaps",
            "swarm", "swash", "swats", "sways", "swear", "sweat", "sweep", "sweet", "swell", "swept", "swift",
            "swigs", "swill", "swims", "swine", "swing", "swirl", "swish", "swoon", "swoop", "sword", "swore",
            "sworn", "swung", "sylph", "synch", "syncs", "syrup", "tabby", "table", "taboo", "tacit", "tacks",
            "tacky", "tails", "taint", "taken", "taker", "takes", "talcs", "talks", "tally", "talon", "tamed",
            "tamer", "tames", "tango", "tangs", "tangy", "tanks", "taper", "tapes", "tardy", "tarot", "tarps",
            "tarry", "tarts", "tased", "tases", "taste", "tasty", "tater", "tatts", "taunt", "taupe", "tawny",
            "teach", "teams", "tears", "tease", "techy", "teddy", "teems", "teens", "teeny", "teeth", "tells",
            "tempi", "tempo", "temps", "tempt", "tench", "tends", "tenet", "tenon", "tenor", "tense", "tenth",
            "tents", "terms", "terns", "terra", "terse", "testy", "tetch", "texts", "thaws", "theft", "there",
            "therm", "these", "theta", "thick", "thief", "thigh", "thing", "think", "third", "thong", "thorn",
            "those", "thous", "three", "threw", "throb", "throw", "thrum", "thugs", "thumb", "thump", "thyme",
            "tiara", "tibia", "ticks", "tidal", "tided", "tides", "tiers", "tiffs", "tiger", "tight", "tiled",
            "tiles", "tills", "tilts", "timed", "timer", "times", "tined", "tines", "tings", "tinge", "tinny",
            "tints", "tipsy", "tired", "tires", "titer", "tithe", "title", "tizzy", "toads", "toast", "today",
            "toddy", "toe", "toile", "toils", "toked", "token", "tokes", "tolls", "tombs", "tomes", "tonal",
            "toned", "toner", "tones", "tongs", "tonic", "ton", "tools", "tooth", "topaz", "topic", "topos",
            "toque", "torch", "tore", "torns", "torts", "torus", "total", "toted", "totes", "toths", "touch",
            "tough", "tours", "touts", "towed", "towel", "tower", "towns", "toxic", "toxin", "trace", "track",
            "tract", "trade", "trail", "train", "trait", "tramp", "trams", "trans", "traps", "trash", "trawl",
            "trays", "tread", "treat", "trees", "treks", "trend", "tress", "treys", "triad", "trial", "tribe",
            "trice", "trick", "tried", "tries", "trill", "trims", "trine", "trios", "tripe", "trips", "troop",
            "trope", "trout", "trove", "truce", "truck", "trued", "trues", "truly", "trump", "trunk", "truss",
            "trust", "truth", "tryst", "tubed", "tubes", "tucks", "tufas", "tufts", "tulip", "tulle", "tummy",
            "tumor", "tunas", "tuned", "tuner", "tunes", "tunic", "turfs", "turks", "turns", "tutor", "twain",
            "twang", "tweak", "tweed", "tween", "tweep", "tweer", "tweet", "twerp", "twice", "twigs", "twill",
            "twine", "twins", "twirl", "twist", "twits", "tying", "tykes", "typed", "types", "typos", "tyros",
            "udder", "ulcer", "ultra", "umbel", "umbra", "umiak", "umped", "unapt", "unarm", "unbar", "unbid",
            "unbow", "unbox", "uncap", "unclog", "uncool", "uncut", "under", "undid", "undue", "unfed", "unfit",
            "unfix", "unfur", "unify", "union", "unite", "units", "unity", "unlay", "unlit", "unmet", "unmap",
            "unpeg", "unpin", "unraw", "unrip", "unsay", "unset", "unsex", "untie", "until", "unwed", "unzip",
            "upend", "upful", "upped", "upset", "urban", "ureas", "urged", "urges", "urine", "usage", "users",
            "usher", "usual", "usurp", "usury", "uteri", "utile", "utter", "vacuo", "vague", "vales", "valet",
            "valid", "valor", "value", "valve", "vamps", "vanes", "vangs", "vaped", "vapes", "vapid", "vapor",
            "vases", "vault", "vaunt", "veals", "vealy", "veeps", "veers", "vegan", "vegie", "veils", "veins",
            "velds", "veldt", "venal", "vends", "venom", "vents", "venue", "verbs", "verge", "verse", "verve",
            "vests", "vetch", "vexed", "vexes", "vials", "viand", "vibes", "vicar", "viced", "vices", "video",
            "views", "vigil", "vigor", "viler", "villa", "ville", "vines", "vinos", "vinyl", "viola", "viols",
            "viper", "viral", "vireo", "vires", "virtu", "virus", "visas", "visit", "visor", "vista", "vital",
            "vivas", "vivid", "vixen", "vizir", "vizor", "vocal", "vodka", "vogue", "voice", "voids", "voles",
            "volts", "vomit", "voted", "voter", "votes", "vouch", "vowed", "vowel", "vying", "wacko", "wacky",
            "waded", "wades", "wadis", "wafer", "waged", "wager", "wages", "wagon", "wails", "waist", "waits",
            "waive", "waked", "waken", "wakes", "walks", "walls", "wally", "walms", "waltz", "wands", "wanes",
            "wanly", "wanna", "wants", "wards", "wares", "warms", "warns", "warts", "warty", "washy", "wasps",
            "waste", "watch", "water", "watts", "waved", "waver", "waves", "waxed", "waxen", "waxes", "weans",
            "wears", "weary", "weave", "webby", "weber", "weeds", "weedy", "weeks", "weeps", "weepy", "weigh",
            "weird", "weirs", "welch", "welds", "wells", "welsh", "welts", "wench", "wends", "wetly", "whack",
            "whale", "whams", "wharf", "whats", "wheal", "wheat", "wheel", "whelk", "whelm", "whelp", "when",
            "where", "whet", "whews", "which", "whiff", "whigs", "while", "whims", "whine", "whiny", "whips",
            "whirl", "whirr", "whisk", "whist", "white", "whits", "whole", "whomp", "whoop", "whops", "whore",
            "whorl", "whose", "wicks", "widen", "wider", "wides", "widow", "width", "wield", "wight", "wikis",
            "wilds", "wiles", "wills", "willy", "wilts", "wince", "winch", "winds", "windy", "wined", "wines",
            "wings", "winks", "winos", "wiped", "wiper", "wipes", "wired", "wires", "wiser", "wises", "wisps",
            "wispy", "witch", "witen", "withs", "witty", "wives", "wizen", "wolds", "woman", "wombs", "women",
            "woods", "woody", "wooed", "woofs", "wooly", "woozy", "words", "wordy", "works", "world", "worms",
            "wormy", "worry", "worse", "worst", "worth", "worts", "would", "wound", "woven", "wowed", "wrack",
            "wraps", "wrath", "wreak", "wreck", "wrens", "wrest", "wrier", "wring", "wrist", "write", "writs",
            "wrong", "wrote", "wryly", "xebec", "xenia", "xenon", "xerox", "xylem", "yacht", "yacks", "yamen",
            "yammer", "yanks", "yards", "yarns", "yawls", "yawns", "yearn", "years", "yeast", "yelps", "yens",
            "yerba", "yield", "yipes", "yodel", "yogis", "yoked", "yokel", "yokes", "yolks", "young", "yours",
            "youth", "yowls", "yucky", "yules", "yummy", "yurts", "zaire", "zany", "zebra", "zebus", "zeros",
            "zests", "zesty", "zilch", "zincs", "zingy", "zonal", "zoned", "zones", "zooed", "zooms"
        ];
        this.currentWord = '';
        this.guesses = [];
        this.currentRow = 0;
        this.gameOver = false;
        // this.wordListPath = config.wordListPath; // No longer needed
        this.wordLength = config.wordLength || 5;
        this.maxGuesses = config.maxGuesses || 6;

        // UI element references
        this.guessInput = document.getElementById('guess-input');
        this.submitButton = document.getElementById('submit-button');
        this.gameGrid = document.getElementById('game-grid');
        this.messageDisplay = document.getElementById('message-display');
        this.keyboardContainer = document.getElementById('keyboard');

        // Stores the 'best' state for each letter on the keyboard
        this.letterStates = {};

        // Event listener for physical keyboard input
        document.addEventListener('keydown', this.handlePhysicalKeyPress.bind(this));
    }

    // The loadWords method is now simplified as the list is pre-loaded
    async loadWords() {
        // With the word list embedded, we just need to ensure it's ready.
        // The filter for wordLength happens in the constructor's definition for wordList.
        // We can optionally re-filter here if wordLength might change dynamically,
        // but for a fixed Wordle, it's usually set once.
        this.wordList = this.wordList.filter(word => word.length === this.wordLength && word.length > 0);
        console.log(`Word list loaded (embedded): ${this.wordList.length} words of length ${this.wordLength}.`);
        return true; // Always succeeds as it's not fetching
    }

    pickRandomWord() {
        if (this.wordList.length === 0) {
            console.error("Word list is empty or not loaded. Cannot pick random word.");
            return null;
        }
        const randomIndex = Math.floor(Math.random() * this.wordList.length);
        return this.wordList[randomIndex];
    }

    initializeGame() {
        if (this.wordList.length === 0) {
            console.error("Attempted to initialize game before word list was loaded.");
            return;
        }
        this.currentWord = this.pickRandomWord();
        // REMOVE THIS LINE LATER FOR REAL GAMEPLAY! It's for debugging.
        console.log("The secret word is:", this.currentWord);

        this.guesses = Array(this.maxGuesses).fill(''); // Each element will be the current guess string
        this.currentRow = 0;
        this.gameOver = false;

        if (this.messageDisplay) this.messageDisplay.textContent = '';
        this.createGameGrid();
        this.createKeyboard(); // Create the on-screen keyboard
        this.resetLetterStates(); // Reset keyboard letter colors for a new game
    }

    // --- Unified Key Press Handler (physical and on-screen) ---
    handleKeyPress(key) {
        if (this.gameOver) return;

        // Get the current row's cells for visual updates
        const currentRowCells = this.gameGrid.children[this.currentRow]?.children;
        if (!currentRowCells) {
            console.warn("Current row cells not found.");
            return;
        }
        let currentGuess = this.guesses[this.currentRow]; // Get the current string guess for this row

        if (key === 'enter') {
            if (currentGuess.length === this.wordLength) {
                this.handleGuess(); // Process the complete guess
            } else {
                this.displayMessage(`Not enough letters!`, true); // Shake row if not full word
            }
        } else if (key === 'backspace') {
            if (currentGuess.length > 0) {
                this.displayMessage(''); // Clear any previous error messages

                // Update the guess string
                currentGuess = currentGuess.slice(0, -1);
                this.guesses[this.currentRow] = currentGuess;

                // Clear the last letter in the UI
                const lastCell = currentRowCells[currentGuess.length];
                if (lastCell) {
                    lastCell.textContent = '';
                    lastCell.classList.remove('filled'); // Remove filled style
                }
            }
        } else if (key.length === 1 && key.match(/[a-z]/i)) { // Check if it's a single letter (a-z)
            if (currentGuess.length < this.wordLength) {
                this.displayMessage(''); // Clear any previous error messages

                // Append letter to the guess string
                currentGuess += key.toLowerCase();
                this.guesses[this.currentRow] = currentGuess;

                // Display the letter in the current cell
                const currentCell = currentRowCells[currentGuess.length - 1];
                if (currentCell) {
                    currentCell.textContent = key.toUpperCase();
                    currentCell.classList.add('filled'); // Add a class for filled cell style
                }
            }
        }
    }

    // --- Physical Keyboard Input Handler ---
    handlePhysicalKeyPress(event) {
        const key = event.key.toLowerCase();
        // Prevent default browser behavior for Enter/Backspace if we handle them
        if (key === 'enter' || key === 'backspace') {
            event.preventDefault();
        }
        this.handleKeyPress(key); // Pass to our unified handler
    }

    // --- Main Guess Processing Logic (Called by handleKeyPress when 'Enter' is pressed) ---
    handleGuess() {
        if (this.gameOver) return;

        const guess = this.guesses[this.currentRow];

        // Ensure length validation (should be caught by handleKeyPress, but good to double check)
        if (guess.length !== this.wordLength) {
            this.displayMessage(`Not enough letters!`, true);
            return;
        }

        // Validate against the available dictionary
        if (!this.wordList.includes(guess)) {
            this.displayMessage(`"${guess.toUpperCase()}" is not in the word list.`, true); // Shake if not in dictionary
            return;
        }

        this.displayMessage(''); // Clear any previous messages

        this.checkLettersForColors(guess); // Apply colors to grid cells and update keyboard states

        // Check for win condition
        if (guess === this.currentWord) {
            this.displayMessage('You guessed it! 🎉', false); // No shake on win
            this.gameOver = true;
            // Optionally add a win animation here
            return;
        }

        // Check for loss condition
        if (this.currentRow >= this.maxGuesses - 1) { // -1 because currentRow is 0-indexed
            this.displayMessage(`Game Over! The word was ${this.currentWord.toUpperCase()}.`, false); // No shake on loss
            this.gameOver = true;
            return;
        }

        this.currentRow++; // Move to the next row for the next guess
        this.guesses[this.currentRow] = ''; // Initialize the next row's guess string
    }

    displayMessage(message, shake = false) {
        if (this.messageDisplay) {
            this.messageDisplay.textContent = message;
            this.messageDisplay.style.color = shake ? 'orange' : '#4CAF50'; // Red/orange for errors, green for success

            // Set a timeout to clear message after a few seconds if it's an error/warning
            if (shake || message.length > 0 && !this.gameOver) {
                clearTimeout(this.messageTimeout); // Clear previous timeout
                this.messageTimeout = setTimeout(() => {
                    if (!this.gameOver) { // Don't clear if game is over (win/loss message)
                        this.messageDisplay.textContent = '';
                    }
                }, 2000); // Message disappears after 2 seconds
            }
        }
        if (shake) {
            const currentRowElement = this.gameGrid?.children[this.currentRow];

            if (currentRowElement) {
                currentRowElement.classList.add('shake');
                currentRowElement.addEventListener('animationend', () => {
                    currentRowElement.classList.remove('shake');
                }, { once: true });
            }
        }
    }

    // --- Grid Creation (no change) ---
    createGameGrid() {
        if (!this.gameGrid) {
            console.warn("Game grid element not found. Cannot create grid.");
            return;
        }
        this.gameGrid.innerHTML = ''; // Clear existing grid
        for (let i = 0; i < this.maxGuesses; i++) {
            const row = document.createElement('div');
            row.classList.add('wordle-row');
            for (let j = 0; j < this.wordLength; j++) {
                const cell = document.createElement('div');
                cell.classList.add('wordle-cell');
                row.appendChild(cell);
            }
            this.gameGrid.appendChild(row);
        }
    }

    // --- Keyboard Creation ---
    createKeyboard() {
        if (!this.keyboardContainer) {
            console.warn("Keyboard container element not found. Cannot create keyboard.");
            return;
        }

        this.keyboardContainer.innerHTML = ''; // Clear any existing keyboard

        const rows = [
            'qwertyuiop',
            'asdfghjkl',
            'zxcvbnm'
        ];

        rows.forEach((rowLetters, index) => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('keyboard-row');

            // Add Enter button to the last row
            if (index === rows.length - 1) {
                const enterButton = document.createElement('button');
                enterButton.textContent = 'Enter';
                enterButton.classList.add('keyboard-button', 'big-button');
                enterButton.dataset.key = 'enter';
                rowDiv.appendChild(enterButton);
            }

            // Create letter buttons
            for (const char of rowLetters) {
                const button = document.createElement('button');
                button.textContent = char.toUpperCase();
                button.classList.add('keyboard-button');
                button.dataset.key = char;
                rowDiv.appendChild(button);
            }

            // Add Backspace button to the last row
            if (index === rows.length - 1) {
                const backspaceButton = document.createElement('button');
                backspaceButton.textContent = 'Backspace';
                backspaceButton.classList.add('keyboard-button', 'big-button');
                backspaceButton.dataset.key = 'backspace';
                rowDiv.appendChild(backspaceButton);
            }

            this.keyboardContainer.appendChild(rowDiv);
        });

        // Add event listener to the keyboard container (event delegation)
        this.keyboardContainer.addEventListener('click', (event) => {
            const target = event.target;
            // Check if the clicked element is a keyboard-button (or a child of one)
            const button = target.closest('.keyboard-button');
            if (button) {
                const key = button.dataset.key;
                this.handleKeyPress(key); // Call the unified handler
            }
        });
    }

    // --- Reset letter states for a new game ---
    resetLetterStates() {
        this.letterStates = {};
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        for (const char of alphabet) {
            this.letterStates[char] = 'default'; // 'default', 'absent', 'present', 'correct'
        }
        this.updateKeyboardColors(); // Apply the default colors to the keyboard
    }

    // --- Update keyboard key colors based on letterStates ---
    updateKeyboardColors() {
        if (!this.keyboardContainer) return;

        this.keyboardContainer.querySelectorAll('.keyboard-button').forEach(button => {
            const keyChar = button.dataset.key; // Get the letter from data-key

            // Skip Enter/Backspace buttons when applying letter states
            if (keyChar === 'enter' || keyChar === 'backspace' || !keyChar.match(/[a-z]/i)) {
                return;
            }

            // Remove existing color classes
            button.classList.remove('keyboard-correct', 'keyboard-present', 'keyboard-absent');

            // Apply the new color class based on the letter's state
            const state = this.letterStates[keyChar];
            if (state && state !== 'default') {
                button.classList.add(`keyboard-${state}`);
            }
        });
    }

    /**
     * Updates the state of a letter for the on-screen keyboard.
     * Higher priority states (correct > present > absent) override lower ones.
     * @param {string} letter The letter to update.
     * @param {string} newState The new state ('correct', 'present', 'absent').
     */
    updateLetterState(letter, newState) {
        const currentState = this.letterStates[letter];

        // Priority logic: correct > present > absent > default
        if (newState === 'correct') {
            this.letterStates[letter] = 'correct';
        } else if (newState === 'present' && currentState !== 'correct') { // Only update to present if not already correct
            this.letterStates[letter] = 'present';
        } else if (newState === 'absent' && currentState !== 'correct' && currentState !== 'present') { // Only update to absent if not already correct or present
            this.letterStates[letter] = 'absent';
        }
        // If newState is default, it only applies if current is also default (implicitly handled)
    }

    // --- Core Wordle Logic: Check letters for colors and update keyboard state ---
    checkLettersForColors(guess) {
        const currentRowElement = this.gameGrid.children[this.currentRow];
        const currentWordLetters = this.currentWord.split('');
        const guessLetters = guess.split('');

        // Track which letters in the secret word have been "consumed" by a match
        const secretWordConsumed = new Array(this.wordLength).fill(false);
        // Track which letters in the guess have been processed (for green/yellow)
        const guessProcessed = new Array(this.wordLength).fill(false);

        // First pass: Identify 'correct' (green) letters
        for (let i = 0; i < this.wordLength; i++) {
            const cellElement = currentRowElement.children[i];
            if (guessLetters[i] === currentWordLetters[i]) {
                cellElement.classList.add('correct');
                this.updateLetterState(guessLetters[i], 'correct');
                secretWordConsumed[i] = true;
                guessProcessed[i] = true;
            }
        }

        // Second pass: Identify 'present' (yellow) and 'absent' (gray) letters
        for (let i = 0; i < this.wordLength; i++) {
            const cellElement = currentRowElement.children[i];
            if (guessProcessed[i]) {
                // This letter was already handled as 'correct' in the first pass
                continue;
            }

            let statusClass = 'absent'; // Default to absent
            let foundPresent = false;

            // Check if the letter exists anywhere in the secret word, not already consumed
            for (let j = 0; j < this.wordLength; j++) {
                if (!secretWordConsumed[j] && guessLetters[i] === currentWordLetters[j]) {
                    statusClass = 'present';
                    secretWordConsumed[j] = true; // Consume this letter in the secret word
                    foundPresent = true;
                    break; // Found a match, move to the next letter in the guess
                }
            }

            cellElement.classList.add(statusClass);
            this.updateLetterState(guessLetters[i], statusClass);
        }

        // Apply flip animation to all cells in the current row after all colors are determined
        Array.from(currentRowElement.children).forEach(cell => {
            cell.classList.add('flipped');
            cell.addEventListener('animationend', () => {
                cell.classList.remove('flipped');
            }, { once: true });
        });

        // Update keyboard colors after processing all letters in the guess
        this.updateKeyboardColors();
    }
}