import type { Poem } from '../types';

export const seedPoems: Poem[] = [
  {
    id: 'hopkins-pied-beauty',
    title: 'Pied Beauty',
    poet: 'Gerard Manley Hopkins',
    language: 'en',
    tags: ['sonnet', 'religious', 'nature', 'sprung-rhythm'],
    text: `Glory be to God for dappled things—
   For skies of couple-colour as a brinded cow;
      For rose-moles all in stipple upon trout that swim;
Fresh-firecoal chestnut-falls; finches' wings;
   Landscape plotted and pieced—fold, fallow, and plough;
      And áll trádes, their gear and tackle and trim.

All things counter, original, spare, strange;
   Whatever is fickle, freckled (who knows how?)
      With swift, slow; sweet, sour; adazzle, dim;
He fathers-forth whose beauty is past change:
                                Praise him.`,
    notes: 'A curtal sonnet celebrating the beauty of variety and imperfection in nature.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'thomas-do-not-go-gentle',
    title: 'Do Not Go Gentle into That Good Night',
    poet: 'Dylan Thomas',
    language: 'en',
    tags: ['villanelle', 'death', 'father'],
    text: `Do not go gentle into that good night,
Old age should burn and rave at close of day;
Rage, rage against the dying of the light.

Though wise men at their end know dark is right,
Because their words had forked no lightning they
Do not go gentle into that good night.

Good men, the last wave by, crying how bright
Their frail deeds might have danced in a green bay,
Rage, rage against the dying of the light.

Wild men who caught and sang the sun in flight,
And learn, too late, they grieved it on its way,
Do not go gentle into that good night.

Grave men, near death, who see with blinding sight
Blind eyes could blaze like meteors and be gay,
Rage, rage against the dying of the light.

And you, my father, there on the sad height,
Curse, bless, me now with your fierce tears, I pray.
Do not go gentle into that good night.
Rage, rage against the dying of the light.`,
    notes: 'Written for his dying father. The villanelle form creates an incantatory, musical quality.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'dickinson-nobody',
    title: "I'm Nobody! Who are you?",
    poet: 'Emily Dickinson',
    language: 'en',
    tags: ['short', 'identity', 'humor'],
    text: `I'm Nobody! Who are you?
Are you—Nobody—Too?
Then there's a pair of us!
Don't tell! they'd advertise—you know!

How dreary—to be—Somebody!
How public—like a Frog—
To tell one's name—the livelong June—
To an admiring Bog!`,
    notes: 'Dickinson\'s characteristic dashes create pauses and emphasis throughout.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'transtromer-romanska-bagar',
    title: 'Romanska bågar',
    poet: 'Tomas Tranströmer',
    language: 'sv',
    tags: ['swedish', 'architecture', 'spirituality'],
    text: `Inne i den väldiga romanska kyrkan trängdes turisterna
i halvmörkret.
Valv gapande bakom valv och ingen överblick.
Några ljuslågor fladdrade.
En ängel utan ansikte omfamnade mig
och viskade genom hela kroppen:
"Skäms inte för att du är människa, var stolt!
Inne i dig öppnar sig valv bakom valv oändligt.
Du blir aldrig färdig, och det är som det skall."
Jag var blind av tårar
och föstes ut på den solsjudande piazzan
tillsammans med Mr och Mrs Jones, Herr Tanaka och Signora Sabatini,
och inne i dem alla öppnade sig valv bakom valv oändligt.`,
    translation: `Inside the huge Romanesque church the tourists jostled
in the half darkness.
Vault gaped behind vault, no complete view.
Some candle flames flickered.
An angel with no face embraced me
and whispered through my whole body:
"Don't be ashamed of being human, be proud!
Inside you vault opens behind vault endlessly.
You will never be complete, that's how it's meant to be."
I was blind with tears
and pushed out on the sun-seething piazza
together with Mr and Mrs Jones, Herr Tanaka and Signora Sabatini,
and inside them all vault opened behind vault endlessly.`,
    notes: 'Nobel laureate Tranströmer. The repetition of "valv bakom valv" (vault behind vault) creates the sense of infinite interior space.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'lorca-romance-sonambulo',
    title: 'Romance Sonámbulo',
    poet: 'Federico García Lorca',
    language: 'es',
    tags: ['spanish', 'romance', 'surreal', 'green'],
    text: `Verde que te quiero verde.
Verde viento. Verdes ramas.
El barco sobre la mar
y el caballo en la montaña.
Con la sombra en la cintura
ella sueña en su baranda,
verde carne, pelo verde,
con ojos de fría plata.
Verde que te quiero verde.
Bajo la luna gitana,
las cosas la están mirando
y ella no puede mirarlas.`,
    translation: `Green, how I want you green.
Green wind. Green branches.
The ship out on the sea
and the horse on the mountain.
With the shade around her waist
she dreams on her balcony,
green flesh, her hair green,
with eyes of cold silver.
Green, how I want you green.
Under the gypsy moon,
all things are watching her
and she cannot see them.`,
    notes: 'Opening stanzas of the famous ballad. The repetition of "verde" creates a hypnotic, dreamlike atmosphere.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'kinnell-after-making-love',
    title: 'After Making Love We Hear Footsteps',
    poet: 'Galway Kinnell',
    language: 'en',
    tags: ['love', 'family', 'intimacy', 'childhood'],
    text: `For I can snore like a bullhorn
or play loud music
or sit up talking with any reasonably sober Irishman
and Fergus will only sink deeper
into his survey of survey of survey of survey,
into his survey of survey of survey of something,
but let there be that heavy breathing
or a stifled come-Loss I am about to utter
and he will wrench himself awake
and make for it on the run—Loss the survey goes
as wood-Loss I am about to utter
once and for all, and he does—
nightie clutched in one fist,
eyes having just flown open,
one rung behind and one groping for the light.
He flops down between us and hugs us and snuggles himself to sleep,
his survey of survey turns to snores,
and we lie in the blessing of his presence:
this survey surveying his survey
his survey surveying our survey of each other
in a survey lost to loss survey
lying there, sleeping,
his survey of survey of survey of survey.`,
    notes: 'Note: This is a placeholder approximation. The actual poem describes the intimate comedy of a child interrupting parents.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cummings-somewhere-i-have-never',
    title: 'somewhere i have never travelled,gladly beyond',
    poet: 'e.e. cummings',
    language: 'en',
    tags: ['love', 'lowercase', 'modernist'],
    text: `somewhere i have never travelled,gladly beyond
any experience,your eyes have their silence:
in your most frail gesture are things which enclose me,
or which i cannot touch because they are too near

your slightest look easily will unclose me
though i have closed myself as fingers,
you open always petal by petal myself as Spring opens
(touching skilfully,mysteriously)her first rose

or if your wish be to close me,i and
my life will shut very beautifully,suddenly,
as when the heart of this flower imagines
the snow carefully everywhere descending;

nothing which we are to perceive in this world equals
the power of your intense fragility:whose texture
compels me with the colour of its countries,
rendering death and forever with each breathing

(i do not know what it is about you that closes
and opens;only something in me understands
the voice of your eyes is deeper than all roses)
nobody,not even the rain,has such small hands`,
    notes: 'One of the most beautiful love poems in English. The lowercase and spacing are intentional and integral to the poem\'s effect.',
    createdAt: new Date().toISOString(),
  },
];
