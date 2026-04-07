export const FONTS_URL = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap";

export const PURCHASE_ORIGINS = [
  { value: "", label: "Select where purchased..." },
  { value: "retailer", label: "Retailer (incl. bespoke made)" },
  { value: "private_sale", label: "Private Sale" },
  { value: "inherited", label: "Inherited" },
  { value: "gift", label: "Received as a gift" },
];

export const ART_TYPES = [
  "Pictures, paintings, photographs, drawings etc",
  "Statues",
  "20th century designer furniture",
  "Antique furniture",
];

export const CATS = {
  jewellery: {
    label: "Jewellery",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
    usps: [
      { icon: "\u2753", title: "Accidental Loss", desc: "Small valuable items are easily lost. You're covered if it disappears." },
      { icon: "\u26A1", title: "Accidental Damage", desc: "Items worn daily take knocks. Repairs and replacements covered." },
      { icon: "\uD83D\uDD12", title: "Theft", desc: "If the worst happens, you're fully covered for stolen jewellery." },
      { icon: "\uD83D\uDC8E", title: "Loss of Stone", desc: "Precious stones come loose. We'll cover the replacement." },
      { icon: "\uD83C\uDF0D", title: "Worldwide Cover", desc: "Travel with peace of mind \u2014 protected wherever you go." },
    ],
    questions: [
      { id: "purchased_30", label: "Was this item purchased in the last 30 days?", type: "yesno", followUp: { id: "previously_insured", label: "Was it previously insured?", type: "yesno", showWhen: "No" } },
      { id: "purchase_origin", label: "Where did you purchase the item?", type: "select", options: PURCHASE_ORIGINS },
      { id: "claim_docs", label: "In the event of a claim, what documents can you produce to support your ownership/value of the item?", type: "multicheck", info: "Please select all that apply", options: [{ value: "valuation", label: "UK valuation obtained within the last 12 months" }, { value: "payment_transfer", label: "Evidence of payment transfer" }, { value: "receipt", label: "Retailer sales receipt" }, { value: "none", label: "None of the above" }] },
      { id: "wearer_name", half: true, label: "Wearer\u2019s full name", type: "text", placeholder: "e.g. Sarah Clayton" },
      { id: "wearer_dob", half: true, label: "Wearer\u2019s date of birth", type: "dob" },
    ],
    itemTypes: ["Ladies' Engagement Ring", "Ladies' Ring (Other than Wedding or Engagement)", "Ladies' Necklaces & Pendants", "Ladies' Wedding Ring", "Ladies' Jewellery - Other", "Men's Engagement Ring", "Men's Wedding Ring", "Men's Jewellery - Other"],
  },
  watches: {
    label: "Watches",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80",
    usps: [
      { icon: "\u2753", title: "Accidental Loss", desc: "Covered if you accidentally lose your watch." },
      { icon: "\uD83D\uDD12", title: "Theft", desc: "Watches are a target. You're fully covered if yours is stolen." },
      { icon: "\u26A1", title: "Accidental Damage", desc: "Knocks and scratches happen. We'll repair or replace." },
      { icon: "\uD83C\uDF0D", title: "Worldwide Cover", desc: "Travel with peace of mind \u2014 protected wherever you go." },
    ],
    questions: [
      { id: "purchased_30", label: "Was this item purchased in the last 30 days?", type: "yesno", followUp: { id: "previously_insured", label: "Was it previously insured?", type: "yesno", showWhen: "No" } },
      { id: "purchase_origin", label: "Where did you purchase the item?", type: "select", options: PURCHASE_ORIGINS },
      { id: "claim_docs", label: "In the event of a claim, what documents can you produce to support your ownership/value of the item?", type: "multicheck", info: "Please select all that apply", options: [{ value: "valuation", label: "UK valuation obtained within the last 12 months" }, { value: "payment_transfer", label: "Evidence of payment transfer" }, { value: "receipt", label: "Retailer sales receipt" }, { value: "none", label: "None of the above" }] },
      { id: "new_secondhand", half: true, label: "New or second-hand?", type: "select", options: [{ value: "", label: "Select..." }, { value: "new", label: "New" }, { value: "secondhand", label: "Second-hand" }] },
      { id: "ladies_gents", half: true, label: "Ladies\u2019 or gents\u2019?", type: "select", options: [{ value: "", label: "Select..." }, { value: "ladies", label: "Ladies\u2019" }, { value: "gents", label: "Gents\u2019" }] },
      { id: "watch_make", half: true, label: "Make", type: "text", placeholder: "e.g. Tag Heuer" },
      { id: "watch_model", half: true, label: "Model", type: "text", placeholder: "e.g. Aquaracer" },
      { id: "watch_model_number", half: true, label: "Model number (if known)", type: "text", placeholder: "Enter watch model number", optional: true },
      { id: "watch_serial", half: true, label: "Serial number (if known)", type: "text", placeholder: "Enter watch serial number", optional: true },
      { id: "wearer_name", half: true, label: "Wearer\u2019s full name", type: "text", placeholder: "e.g. James Clayton" },
      { id: "wearer_dob", half: true, label: "Wearer\u2019s date of birth", type: "dob" },
    ],
    itemTypes: ["Luxury Watch", "Sports Watch", "Dress Watch", "Vintage / Antique Watch", "Smartwatch", "Other Watch"],
  },
  cameras: {
    label: "Cameras & Telescopes",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    usps: [
      { icon: "\u2753", title: "Accidental Loss", desc: "Covered if you lose your camera \u2014 not just theft." },
      { icon: "\u26A1", title: "Accidental Damage", desc: "Equipment takes a beating in the field. Repairs or replacement covered." },
      { icon: "\uD83D\uDD12", title: "Theft", desc: "Camera gear is a target. You're covered if you're a victim of crime." },
      { icon: "\uD83D\uDE97", title: "Unattended Vehicle", desc: "Gear stolen from a locked boot? You're covered." },
      { icon: "\uD83D\uDD27", title: "Equipment Hire", desc: "Need to keep shooting? Replacement hire gear included." },
    ],
    questions: [
      { id: "amateur_pro", label: "Is this for amateur or professional use?", type: "select", options: [{ value: "", label: "Select..." }, { value: "amateur", label: "Amateur" }, { value: "professional", label: "Professional" }] },
      { id: "accessories_value", label: "Total value of your accessories?", type: "currency", placeholder: "e.g. 500" },
    ],
    itemTypes: ["Complete Camera", "Camera Lens", "Camera Body", "Camera Accessories", "Telescope"],
  },
  bicycles: {
    label: "Bicycles & E-Bikes",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
    usps: [
      { icon: "\u26A1", title: "Accidental / Malicious Damage", desc: "Crash or vandalism \u2014 you're covered either way." },
      { icon: "\uD83D\uDEB2", title: "Replacement Cycle Hire", desc: "We'll keep you on the road while yours is repaired or replaced." },
      { icon: "\u2696\uFE0F", title: "Legal Expenses", desc: "Automatic \u00A3100,000 legal expenses insurance included." },
      { icon: "\uD83D\uDD12", title: "Theft", desc: "Bikes are stolen every day. You're fully covered." },
      { icon: "\uD83D\uDCE6", title: "Cycle Box Cover", desc: "Your cycle box is automatically covered." },
      { icon: "\uD83D\uDD04", title: "Non-Fault Recovery", desc: "Not your fault? We'll help recover your excess." },
    ],
    questions: [
      { id: "accessories_cover", half: true, label: "Accessories cover", type: "select", info: "We automatically include cover for accessories up to \u00A3100 but you can choose to increase this limit.", options: [{ value: "", label: "Select..." }, { value: "100", label: "\u00A3100" }, { value: "250", label: "\u00A3250" }, { value: "500", label: "\u00A3500" }] },
      { id: "trailer_details", half: true, label: "Trailer details", type: "text", info: "Please note the make(s) of any trailers here.", placeholder: "Optional", optional: true },
      { id: "cycle_hire", half: true, label: "Replacement cycle hire", type: "select", info: "Ideal if you need your cycle to travel to work.", options: [{ value: "", label: "Select..." }, { value: "500", label: "\u00A3500" }, { value: "750", label: "\u00A3750" }, { value: "1000", label: "\u00A31,000" }], optional: true },
      { id: "helmet_clothing", half: true, label: "Helmet & clothing", type: "select", info: "Inclusive insurance for your specialist helmets and clothing.", options: [{ value: "", label: "Select..." }, { value: "100", label: "\u00A3100" }, { value: "250", label: "\u00A3250" }, { value: "500", label: "\u00A3500" }], optional: true },
      { id: "ncb", half: true, label: "No claims bonus", type: "select", info: "We\u2019ll allow you a discount if you have not made any previous claims.", options: [{ value: "", label: "Select..." }, { value: "0", label: "0 years" }, { value: "1", label: "1 year" }, { value: "2", label: "2 years" }, { value: "3", label: "3 years" }, { value: "4", label: "4 years" }, { value: "5", label: "5 years" }] },
      { id: "geo_limits", half: true, label: "Geographical limits", type: "static", info: "UK and 45 days European Union coverage.", value: "UK and 45 days free Europe" },
      { id: "optional_extras", label: "Optional extras", type: "checkboxes", optional: true, options: [
        { value: "personal_accident", label: "Personal Accident", info: "Provides a capital sum for serious accidents whilst using your cycle." },
        { value: "get_you_home", label: "\u201CGet You Home\u201D Costs", info: "Covers reasonable costs of taxi hire to get you home following an insured event." },
        { value: "competition_use", label: "Competition Use", info: "Extends cover for competitions such as cyclo-cross or triathlons." },
        { value: "family_use", label: "Family Use", info: "Include family members (partner and relatives 14+ living with you)." },
      ] },
    ],
    itemTypes: ["BMX", "Cargo", "Cruiser", "Cyclo-Cross", "Dutch / Shopping", "Electric Bicycle", "Fat", "Fixed Gear", "Gravel", "Hand", "Hybrid / Flatbar / Commuter", "Mountain", "Recumbent", "Road / Racing", "Tandem", "Time Trial / Triathlon", "Touring", "Track", "Trekking", "Tricycle", "Unicycle", "Other"],
  },
  instruments: {
    label: "Musical Instruments",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80",
    usps: [
      { icon: "\uD83C\uDF0D", title: "Worldwide Cover", desc: "Gigging abroad? Covered on unlimited trips." },
      { icon: "\uD83C\uDFB5", title: "Equipment Hire", desc: "Replacement hire while yours is repaired (15% of sum)." },
      { icon: "\uD83D\uDE97", title: "Unattended Vehicle", desc: "Up to \u00A35k in a locked boot for 12 hours." },
      { icon: "\uD83D\uDEE1\uFE0F", title: "Zero Excess", desc: "\u00A30 compulsory excess on every claim." },
    ],
    questions: [
      { id: "electric_acoustic", label: "Electric or acoustic?", type: "select", options: [{ value: "", label: "Select..." }, { value: "electric", label: "Electric" }, { value: "acoustic", label: "Acoustic / Non-Electric" }] },
      { id: "purchased_30", label: "Was this item purchased in the last 30 days?", type: "yesno", followUp: { id: "previously_insured", label: "Was it previously insured?", type: "yesno", showWhen: "No" } },
      { id: "purchase_origin", label: "Where did you purchase the item?", type: "select", options: PURCHASE_ORIGINS },
    ],
    itemTypes: ["Guitar", "Piano / Keyboard", "Violin / Strings", "Drums / Percussion", "Brass", "Woodwind", "DJ Equipment", "Other Instrument"],
  },
  collectibles: {
    label: "Fine Art & Collectibles",
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&q=80",
    usps: [
      { icon: "\uD83D\uDCDC", title: "Pairs & Sets", desc: "Items more valuable as a set? Covered if the set is damaged or incomplete." },
      { icon: "\uD83D\uDCC9", title: "Depreciation in Value", desc: "If a repaired piece loses value, you're covered for the difference." },
      { icon: "\uD83C\uDFA8", title: "Death of Artist", desc: "Your artwork is covered if the original artist passes away.", artOnly: true },
      { icon: "\u2753", title: "Accidental Loss for Art", desc: "Misplaced or lost your fine art? You're fully covered.", artOnly: true },
    ],
    questions: [
      { id: "purchased_30", label: "Was this item acquired in the last 30 days?", type: "yesno", followUp: { id: "previously_insured", label: "Was it previously insured?", type: "yesno", showWhen: "No" } },
      { id: "purchase_origin", label: "Where was this item acquired?", type: "select", options: [{ value: "", label: "Select..." }, { value: "gallery", label: "Gallery" }, { value: "auction", label: "Auction House" }, { value: "private_sale", label: "Private Sale" }, { value: "inherited", label: "Inherited" }, { value: "gift", label: "Received as a gift" }, { value: "commission", label: "Commissioned from artist" }] },
      { id: "has_provenance", label: "Do you have provenance documentation?", type: "yesno" },
    ],
    itemTypes: [
      "Pictures, paintings, photographs, drawings etc", "Statues", "20th century designer furniture",
      "Antique furniture", "Books, comics and manuscripts", "Clocks and other mechanical items",
      "Coins, Banknotes", "Dolls-Bears", "Glass and crystal", "Gold, silver and other precious metals",
      "Maps, prints and lithographs", "Medals and militaria", "Musical boxes and automata",
      "Porcelain and ceramics", "Pottery", "Rocks-Fossils-Minerals", "Sporting memorabilia",
      "Stamps", "Toys", "Wine", "Other specified items",
    ],
  },
};

export const INCLUDED_ITEMS = [
  { title: "Contents cover", limit: null, info: "Total sum insured for your home contents." },
  { title: "Public liability", limit: "\u00A31,000,000", info: "Covers injury or property damage in your home." },
  { title: "Alternative accommodation", limit: "\u00A310,000", info: "Temporary housing if your home is uninhabitable." },
  { title: "Tenants liability", limit: "\u00A35,000", info: "Covers damage to landlord's fixtures." },
  { title: "Money & bank cards", limit: "\u00A3750", info: "Cash and fraudulent use of stolen cards." },
  { title: "Replacement locks", limit: "\u00A3750", info: "Replacing locks if keys are lost or stolen." },
  { title: "Fridge & freezer cover", limit: "\u00A3750", info: "Spoiled food from breakdown or power failure." },
  { title: "Loss of metered water", limit: "\u00A3750", info: "Increased water bills from escape of water." },
  { title: "New acquisitions", limit: "10%", info: "New items auto-covered for 60 days at 10% of sum." },
];

export const ITEM_LIMITS = [
  { title: "Mobile phone", limit: "\u00A31,000", info: "Per device limit for mobile phones." },
  { title: "Laptop", limit: "\u00A31,000", info: "Per device limit for laptops and tablets." },
];

export const NOT_COVERED = [
  { title: "Mechanical breakdown or wear and tear", info: "Gradual deterioration, rust, mould, or wearing out." },
  { title: "Damage caused by pets", info: "Scratching, chewing, or other pet damage." },
  { title: "Gradual deterioration", info: "Slow-acting causes like damp, rot, mildew." },
  { title: "Intentional damage by household members", info: "Deliberate damage by you or household members." },
];

export const ADD_ONS = [
  { id: "home_emergency", title: "Home Emergency Cover", price: 34.99, period: "yr", summary: "24/7 helpline for boiler, plumbing, electrics, and lock problems.", details: ["24/7 emergency helpline", "Boiler and heating breakdown", "Plumbing and drainage emergencies", "Electrical supply failure", "Up to \u00A3500 per callout"] },
  { id: "family_legal", title: "Family Legal Protection", price: 19.99, period: "yr", summary: "Legal advice and cover for employment, contract, and property disputes.", details: ["Access to expert lawyers", "Up to \u00A350,000 legal costs", "Employment disputes", "Contract and property disputes", "Personal injury claims"] },
  { id: "accidental_damage", title: "Accidental Damage", price: 24.99, period: "yr", summary: "Covers accidental damage inside the home \u2014 spills, breakages, mishaps.", details: ["Spills and stains on furniture", "Breakage of mirrors and glass", "Damage to TVs and electronics", "Covers the full household", "No limit on claims"] },
];

export const EXCESS_OPTIONS = [
  { value: 0, label: "\u00A30", saving: 0 },
  { value: 100, label: "\u00A3100", saving: 18 },
  { value: 150, label: "\u00A3150", saving: 24 },
  { value: 250, label: "\u00A3250", saving: 36 },
  { value: 500, label: "\u00A3500", saving: 52 },
];

export const CATEGORY_OPTIONS = [
  { key: "jewellery", label: "Jewellery", icon: "\uD83D\uDC8D", defaultType: "Engagement Ring", defaultDesc: "" },
  { key: "watches", label: "Watches", icon: "\u231A", defaultType: "Luxury Watch", defaultDesc: "" },
  { key: "cameras", label: "Cameras", icon: "\uD83D\uDCF7", defaultType: "Camera Body", defaultDesc: "" },
  { key: "bicycles", label: "Bicycles", icon: "\uD83D\uDEB2", defaultType: "Road Bike", defaultDesc: "" },
  { key: "instruments", label: "Instruments", icon: "\uD83C\uDFB8", defaultType: "Guitar", defaultDesc: "" },
  { key: "collectibles", label: "Art & Collectibles", icon: "\uD83C\uDFA8", defaultType: "Pictures, paintings, photographs, drawings etc", defaultDesc: "" },
];

export const COVERAGE_ANCHORS = [
  { threshold: 0, label: "No out-of-home cover", color: "text-text-muted" },
  { threshold: 250, label: "Covers a phone and everyday carry", color: "text-text-secondary" },
  { threshold: 500, label: "Covers a laptop and tablet on the go", color: "text-text-secondary" },
  { threshold: 1000, label: "Covers most portable electronics and bags", color: "text-text-primary" },
  { threshold: 1500, label: "Strong cover for multiple devices and accessories", color: "text-text-primary" },
  { threshold: 2000, label: "Comprehensive out-of-home protection", color: "text-text-primary" },
  { threshold: 2500, label: "Near-maximum portable cover", color: "text-success" },
  { threshold: 3000, label: "Maximum out-of-home protection", color: "text-success" },
];

export const UNSPEC_EXAMPLES = [
  { icon: "\uD83E\uDE9E", label: "Carpets & curtains" }, { icon: "\uD83D\uDECB\uFE0F", label: "Furniture" },
  { icon: "\uD83C\uDF73", label: "Kitchen contents" }, { icon: "\uD83D\uDCF1", label: "Electronics" },
  { icon: "\uD83D\uDCFA", label: "TVs & audio" }, { icon: "\uD83D\uDC57", label: "Clothing & linen" },
  { icon: "\uD83C\uDF3F", label: "Garden & tools" }, { icon: "\uD83C\uDFCB\uFE0F", label: "Sports & luggage" },
];

export const PRICING = {
  baseMonthly: 33.15,
  baseAnnual: 397.80,
}

export const POLICY_HOLDER = {
  name: 'James',
  policyRef: '10492393',
}

export const CONTENTS_LIMITS = [
  { value: 50000, label: '\u00A350,000' },
  { value: 75000, label: '\u00A375,000' },
  { value: 100000, label: '\u00A3100,000' },
]

export const SINGLE_ITEM_LIMIT = 1000

export const SAMPLE_ITEMS = [
  { id: 1, name: "Rolex Submariner", category: "watches", type: "Luxury Watch", description: "Rolex Submariner Date 41mm, ceramic bezel", value: 12500 },
  { id: 2, name: "Engagement Ring", category: "jewellery", type: "Ladies' Engagement Ring", description: "1.5ct diamond solitaire, platinum setting", value: 8000 },
  { id: 3, name: "Sony A7 IV", category: "cameras", type: "Complete Camera", description: "Sony Alpha A7 IV mirrorless body", value: 2400 },
  { id: 4, name: "Specialized Tarmac", category: "bicycles", type: "Road / Racing", description: "Specialized Tarmac SL7 Expert", value: 5500 },
  { id: 5, name: "Banksy Original", category: "collectibles", type: "Pictures, paintings, photographs, drawings etc", description: "Signed original screenprint, framed", value: 35000 },
];
