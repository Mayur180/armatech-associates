// ============================================================
// PER-MODEL PAGE COPY
// Written from the specifications in lib/catalog.ts. Each model
// gets its own text so the 16 model pages are not duplicates.
// ============================================================

export type ModelCopy = {
  headline: string
  paragraphs: string[]
  bestFor: string[]
  scope: string[]
}

const commonScope = [
  "Machine and optics as listed in the specification table",
  "Calibration certificate for the stated accuracy",
  "Installation and operator training at your site",
  "Warranty and delivery terms confirmed in the quotation",
]

export const modelCopy: Record<string, ModelCopy> = {
  // ----------------------------------------------------------
  // MANUAL VMM
  // ----------------------------------------------------------
  "AA-9011M": {
    headline: "The compact manual VMM for small, high-mix parts.",
    paragraphs: [
      "AA-9011M is the smallest machine in the manual CRYSTAL range, with a 200 × 100 × 150 mm measuring envelope on a 540 × 540 × 860 mm frame. It suits a tool room or inspection bay where floor space is limited but sub-micron scale reading still matters: the linear scales resolve to 0.5 µm (0.1 µm optional) and the 0.7–4.5X manual zoom covers 18–195X magnification.",
      "Because X, Y and Z are hand-driven, the operator stays in control of every move. That is useful for one-off parts, thin stampings, connectors and small machined components where writing a program is unnecessary. Accuracy is 2.5 + L/100 µm with 2.5 µm repeatability, and the 150 kg frame needs no special foundation beyond a stable inspection-room floor.",
      "Loading is direct from the front of the stage, and the 150 mm Z travel is enough for the stampings and connectors this size of machine usually sees.",
    ],
    bestFor: [
      "Small machined components",
      "Connectors and terminals",
      "Thin stampings and pressings",
      "One-off tool-room inspection",
    ],
    scope: commonScope,
  },

  "AA-9012M": {
    headline: "The workhorse manual size for bracket-scale components.",
    paragraphs: [
      "The 300 × 200 × 200 mm envelope of AA-9012M is the size most inspection rooms settle on. It accepts automotive brackets, machined housings and small assemblies that would not fit the smallest manual model, while the 200 kg, 665 × 670 × 915 mm frame still fits a normal bench area.",
      "Operation is fully manual on all three axes, with 0.5 µm scale resolution and 18–195X magnification from the 0.7–4.5X zoom objective. Stated accuracy is 2.5 + L/100 µm and repeatability 2.5 µm — the same as the rest of the manual family — so the choice between models is about part size, not measurement quality. Programmable 8-section ring lighting and bottom parallel light handle both surface and contour features.",
      "With programmable ring lighting and parallel bottom light as standard, surface detail and contour edges can be checked in the same setup without changing hardware.",
    ],
    bestFor: [
      "Automotive brackets and housings",
      "Small machined assemblies",
      "Sheet-metal components",
      "General dimensional inspection",
    ],
    scope: commonScope,
  },

  "AA-9013M": {
    headline: "The largest manual VMM, for parts that need room.",
    paragraphs: [
      "AA-9013M extends the manual range to 400 × 300 × 200 mm, with a 724 × 855 × 915 mm frame and 255 kg mass. It is the right choice when the parts are larger than a bracket — die blocks, plates, fabricated sheet-metal parts and mould bases — but the workflow is still one-off or low-volume, where an operator prefers to drive the axes by hand.",
      "The optical package is unchanged from the smaller manual models: 0.7–4.5X manual zoom, 18–195X magnification, 0.5 µm linear scales and programmable LED ring plus bottom illumination. Accuracy remains 2.5 + L/100 µm with 2.5 µm repeatability, so moving up in size does not cost measurement performance. Z travel of 200 mm allows stepped and taller parts to be focused without re-fixturing.",
      "Plan for a 255 kg machine on a stable floor: the frame footprint is 724 × 855 mm, so the bench or stand has to be sized for it before delivery.",
    ],
    bestFor: [
      "Die blocks and mould bases",
      "Larger plates and fabrications",
      "Sheet-metal parts",
      "Low-volume inspection",
    ],
    scope: commonScope,
  },

  // ----------------------------------------------------------
  // SEMI AUTOMATIC VMM
  // ----------------------------------------------------------
  "AA-9021SA": {
    headline: "Manual X/Y with a powered Z axis, in the smallest size.",
    paragraphs: [
      "AA-9021SA keeps the 200 × 100 × 150 mm envelope of the smallest manual machine but adds a computer-controlled Z axis. X and Y remain hand-driven, so the operator still feels the part, while vertical focus and contour scanning are powered — which makes repeated height and step measurements more consistent than turning a knob by hand.",
      "The machine weighs 130 kg on a 550 × 540 × 930 mm frame and carries the same optics as the manual range: industrial colour CCD, 0.7–4.5X zoom and 0.5 µm scales. Accuracy is 2.5 + L/100 µm with ±2.5 µm repeatability. A two-axis measurement software package handles the routine dimensional work. It suits small parts inspected in batches, where the powered Z removes the slowest manual step.",
      "The powered Z travel is 150 mm, matching the envelope, and the 130 kg mass on a 550 × 540 mm footprint keeps installation simple.",
    ],
    bestFor: [
      "Small parts in batches",
      "Height and step measurement",
      "Connectors and small pressings",
      "Routine dimensional inspection",
    ],
    scope: [
      "Machine with powered Z axis and 0.5 µm scales",
      "0.7–4.5X manual zoom lens",
      "Two-axis measurement software",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },

  "AA-9022SA": {
    headline: "The standard semi-automatic size for mixed component work.",
    paragraphs: [
      "With a 300 × 200 × 200 mm envelope, AA-9022SA covers the same parts as the mid-size manual model but automates the Z axis. That matters when operators measure the same feature at different heights through a shift: powered focus gives them a repeatable starting point instead of a hand-set one, and the 2.5 + L/100 µm accuracy is stated against that consistent method.",
      "At 180 kg on a 600 × 740 × 980 mm frame it still fits an inspection room without a special base. The optical chain is the familiar CRYSTAL combination of industrial colour CCD camera, 0.7–4.5X manual zoom and 0.5 µm linear scales, with LED surface and parallel contour lighting. Repeatability is ±2.5 µm. This is the size most customers choose when they move from fully manual operation but do not yet need a programmed routine.",
      "The 200 mm Z travel gives clearance for stepped parts, and measurement results can be reported against nominal dimensions from the software.",
    ],
    bestFor: [
      "Automotive components",
      "Machined housings and covers",
      "Batch inspection with varied heights",
      "First step up from manual control",
    ],
    scope: [
      "Machine with powered Z axis and 0.5 µm scales",
      "0.7–4.5X manual zoom lens",
      "Two-axis measurement software",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },

  "AA-9023SA": {
    headline: "The largest semi-automatic model, for bigger parts.",
    paragraphs: [
      "AA-9023SA brings the semi-automatic layout to a 400 × 300 × 200 mm measuring range, with a 700 × 840 × 980 mm frame and 230 kg mass. It is intended for larger machined and fabricated parts where the operator still wants direct control of X and Y but benefits from powered Z movement for focus and step measurement.",
      "The specification differs slightly from the smaller semi-automatic models: accuracy is 2.6 + L/100 µm and repeatability is ±3 µm, reflecting the larger structure. Everything else follows the family — industrial colour CCD, 0.7–4.5X manual zoom, 0.5 µm linear scales and LED surface plus parallel contour lighting. Choose this model when part size is the constraint and the tolerances remain in the tens of microns.",
      "The larger frame is worth planning around: leave room to walk around the stage, because loading 400 mm parts from one side only becomes awkward.",
    ],
    bestFor: [
      "Larger machined parts",
      "Fabricated components",
      "Low-to-medium volume inspection",
      "General engineering tolerances",
    ],
    scope: [
      "Machine with powered Z axis and 0.5 µm scales",
      "0.7–4.5X manual zoom lens",
      "Two-axis measurement software",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },

  // ----------------------------------------------------------
  // FULLY AUTOMATIC VMM
  // ----------------------------------------------------------
  "AA-9031A": {
    headline: "Programmed inspection in a compact footprint.",
    paragraphs: [
      "AA-9031A is the smallest fully automatic model, with a 200 × 200 × 200 mm range driven by servo motors on all three axes. Once a routine is written, the machine repeats the same sequence of moves, focuses and measurements without an operator at the handwheels — which is the point of the automatic range: consistent results across shifts and operators, not just a faster single measurement.",
      "The automatic zoom system and high-resolution CCD camera handle magnification changes inside the program, while programmable LED surface and bottom lighting can be set per feature. Stated accuracy is 2.5 + L/100 µm with 2.5 µm repeatability. The two-dimensional and three-dimensional measurement software supports programmed routines and reporting. It suits small-to-medium parts inspected in volume, where the same features are checked every time.",
      "The software keeps programs for repeat parts, so switching jobs means loading the right routine rather than re-teaching the machine.",
    ],
    bestFor: [
      "High-volume small parts",
      "Repeatable program-driven inspection",
      "Automotive quality control",
      "Multi-shift consistency",
    ],
    scope: [
      "Servo-driven machine with automatic zoom",
      "2D and 3D measurement software",
      "Programmable LED surface and bottom lighting",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },

  "AA-9032A": {
    headline: "The standard automatic size for production inspection.",
    paragraphs: [
      "AA-9032A offers a 300 × 200 × 200 mm envelope with full computer control and servo drive. It is the size that fits most automotive and general-engineering components while keeping the frame compact enough for a dedicated inspection station or a quality lab bench.",
      "Because the program owns the motion, the same part can be measured by different operators and compared directly. Accuracy is 2.5 + L/100 µm with 2.5 µm repeatability, and the automatic zoom plus programmable illumination let one routine cover features that need different magnification and lighting. The 2D and 3D software handles routine creation, execution and reporting. If you are moving from manual inspection to a repeatable process, this is the middle of the automatic range and the usual starting point.",
      "The 200 mm Z travel and automatic zoom let one routine move between a low boss and a raised edge without an operator touching the machine.",
    ],
    bestFor: [
      "Production component inspection",
      "Automotive parts",
      "Medium-size machined parts",
      "Quality-lab routine measurement",
    ],
    scope: [
      "Servo-driven machine with automatic zoom",
      "2D and 3D measurement software",
      "Programmable LED surface and bottom lighting",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },

  "AA-9033A": {
    headline: "The largest automatic VMM without an enclosure.",
    paragraphs: [
      "AA-9033A takes the automatic range to 400 × 300 × 200 mm. It suits larger components and fixtures that still need programmed, servo-driven inspection but do not require the enclosed cabinet of the AC models. The open frame keeps loading and unloading straightforward for heavy or awkward parts.",
      "Motion is computer-controlled on all axes with servo drive, and the automatic zoom and programmable lighting are managed inside the measurement routine. Accuracy is 2.5 + L/100 µm and repeatability 2.5 µm. The 2D and 3D software supports program creation, execution and reporting across a batch. Where parts are large but the inspection is repetitive, this model gives the automation without the cabinet footprint.",
      "The 400 × 300 mm stage gives the same working area as the largest manual model but with servo motion, and the open frame keeps loading and service access straightforward. Allow clearance around the full travel.",
    ],
    bestFor: [
      "Larger production parts",
      "Fixtured components",
      "Open-frame loading",
      "Programmed batch inspection",
    ],
    scope: [
      "Servo-driven machine with automatic zoom",
      "2D and 3D measurement software",
      "Programmable LED surface and bottom lighting",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },

  // ----------------------------------------------------------
  // AUTOMATIC VMM WITH CABINET
  // ----------------------------------------------------------
  "AA-9041AC": {
    headline: "The most accurate model in the range, fully enclosed.",
    paragraphs: [
      "AA-9041AC pairs a 300 × 200 × 200 mm measuring range with a complete machine cabinet. The enclosure protects the optics and stage from dust and draughts on a shop floor and keeps the working area consistent between shifts — which is why the stated accuracy is 2 + L/100 µm with 2 µm repeatability, the tightest in the CRYSTAL range.",
      "Motion is computer-controlled through high-precision servo drives, and the 1–10X automatic zoom lens works with the 1.3 MP digital camera across 18–195X magnification. Programmable 8-zone ring lighting and bottom parallel light are set per feature. The machine weighs 380 kg on a 650 × 950 × 1740 mm cabinet. It is the entry point to the enclosed series and suits inspection rooms that want automation and a controlled environment in one unit.",
      "The cabinet also shields the stage from ambient light, which matters when surface illumination is tuned for low-contrast edges.",
    ],
    bestFor: [
      "Tight-tolerance inspection",
      "Shop-floor installation",
      "Dust-sensitive environments",
      "Programmed production checks",
    ],
    scope: [
      "Enclosed cabinet with servo-driven axes",
      "1–10X automatic zoom and 1.3 MP camera",
      "Programmable 8-zone ring and bottom lighting",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },

  "AA-9042AC": {
    headline: "Enclosed automation with a 400 × 300 mm stage.",
    paragraphs: [
      "AA-9042AC uses the same enclosure and optical package as the smaller cabinet model but extends the measuring range to 400 × 300 × 200 mm. Accuracy stays at 2 + L/100 µm with 2 µm repeatability, so the larger stage does not trade away measurement performance. The cabinet grows to 730 × 1040 × 1740 mm and the machine weighs 530 kg.",
      "The 1–10X automatic zoom and 1.3 MP digital camera are controlled inside the measurement program, along with programmable 8-zone ring and bottom parallel lighting. Servo drives move all three axes under computer control. This model suits automotive and general-engineering parts that need the larger stage and the environmental stability of an enclosure, in a production or audit-facing inspection room.",
      "The 400 × 300 mm stage runs the same 1.3 MP camera and automatic zoom, so a program written on the smaller cabinet model carries over with only the travel changed.",
    ],
    bestFor: [
      "Larger precision components",
      "Audit-facing inspection rooms",
      "Automotive production parts",
      "Controlled-environment measurement",
    ],
    scope: [
      "Enclosed cabinet with servo-driven axes",
      "1–10X automatic zoom and 1.3 MP camera",
      "Programmable 8-zone ring and bottom lighting",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },

  "AA-9043AC": {
    headline: "A 500 × 400 mm enclosed stage for bigger parts.",
    paragraphs: [
      "AA-9043AC moves the cabinet series up to 500 × 400 × 200 mm. Parts of this size — large housings, moulded components, fixture plates — often cannot be loaded onto a smaller stage without repositioning, and every repositioning adds error. The larger travel lets one program cover the whole part.",
      "As with the larger models in the series, stated accuracy is 2.5 + L/100 µm with 2.5 µm repeatability, reflecting the bigger structure. The optical and motion package is common to the family: 1–10X automatic zoom, 1.3 MP digital camera, servo-driven computer control and programmable 8-zone ring plus bottom parallel lighting. The cabinet measures 790 × 1130 × 1760 mm and the machine weighs 640 kg. It suits production inspection where part size is the deciding factor.",
      "Delivery access matters at this size: confirm door widths and lift capacity before dispatch, because the machine is 640 kg and the cabinet is 790 × 1130 mm.",
    ],
    bestFor: [
      "Large housings and mouldings",
      "Fixture plates",
      "Multi-feature parts in one program",
      "Shop-floor production inspection",
    ],
    scope: [
      "Enclosed cabinet with servo-driven axes",
      "1–10X automatic zoom and 1.3 MP camera",
      "Programmable 8-zone ring and bottom lighting",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },

  "AA-9044AC": {
    headline: "The largest VMM in the CRYSTAL range.",
    paragraphs: [
      "AA-9044AC is the biggest machine in this catalogue: a 600 × 500 × 200 mm measuring range inside an 890 × 1370 × 1780 mm cabinet, weighing 715 kg. It exists for parts that simply will not fit anywhere else — large castings, long fabricated assemblies and oversized moulded components that still need optical measurement rather than a CMM touch probe.",
      "Motion is computer-controlled with high-precision servo drives, and the 1–10X automatic zoom with 1.3 MP camera covers 18–195X magnification. Programmable 8-zone ring and bottom parallel lighting are managed inside the routine. Accuracy is 2.5 + L/100 µm with 2.5 µm repeatability. Because of its size, plan the installation location in advance: the machine needs a clear floor area, stable footing and access for delivery.",
      "Fixturing should support large parts without letting them overhang the stage edges, and the 200 mm Z travel sets the height limit for the setup.",
    ],
    bestFor: [
      "Large castings and assemblies",
      "Oversized mouldings",
      "Parts measured in one setup",
      "Dedicated inspection cells",
    ],
    scope: [
      "Enclosed cabinet with servo-driven axes",
      "1–10X automatic zoom and 1.3 MP camera",
      "Programmable 8-zone ring and bottom lighting",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },

  // ----------------------------------------------------------
  // VMS VMM
  // ----------------------------------------------------------
  "AA-9051V": {
    headline: "A manual video measuring system with a finer scale.",
    paragraphs: [
      "AA-9051V is the smallest VMS model: 200 × 100 × 150 mm travel on a 550 × 540 × 880 mm frame, 140 kg. The distinction from the manual VMM range is the readout — the linear scales resolve to 0.001 mm rather than 0.5 µm — and a longer 108 mm working distance, which leaves room for taller features and lighting accessories under the lens.",
      "Adjustment is manual, with a 0.7–4.5X zoom lens covering 18–188X magnification and LED surface plus parallel bottom illumination. Stated accuracy is 2.5 + L/100 µm with 2.5 µm repeatability. It suits small parts and tool-room work where a direct, simple optical system is preferred and the operator wants a long working distance over a rotary or powered stage.",
      "A 0.001 mm readout suits drawings dimensioned in millimetres; where a drawing calls for sub-micron resolution, the manual VMM range is the better fit.",
    ],
    bestFor: [
      "Small precision parts",
      "Taller features and accessories",
      "Tool-room inspection",
      "Simple manual measurement workflow",
    ],
    scope: [
      "Manual machine with 0.001 mm linear scales",
      "0.7–4.5X zoom lens, 108 mm working distance",
      "LED surface and parallel bottom lighting",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },

  "AA-9052V": {
    headline: "The mid-size VMS for general inspection work.",
    paragraphs: [
      "AA-9052V offers a 300 × 200 × 200 mm measuring range in the VMS family, on a 600 × 740 × 930 mm frame weighing 190 kg. It covers the bracket-and-housing sizes that dominate general engineering inspection while keeping the manual, direct-control workflow of the series.",
      "The optical system uses an industrial CCD camera and a 0.7–4.5X manual zoom with 18–188X magnification, plus LED surface and parallel bottom lighting. Linear scales read to 0.001 mm, the working distance is 108 mm, and stated accuracy is 2.5 + L/100 µm with 2.5 µm repeatability. Choose it when you want the VMS layout at a size that fits most everyday parts.",
      "The 600 × 740 mm footprint leaves room for fixturing on the stage, and the 200 mm Z travel covers most bracket heights. Because the working distance is 108 mm, ring lighting and taller fixtures can sit under the lens without crowding the part.",
    ],
    bestFor: [
      "General engineering components",
      "Machined brackets and covers",
      "Routine manual inspection",
      "Larger working distance needs",
    ],
    scope: [
      "Manual machine with 0.001 mm linear scales",
      "0.7–4.5X zoom lens, 108 mm working distance",
      "LED surface and parallel bottom lighting",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },

  "AA-9053V": {
    headline: "The largest VMS, for bigger manual inspection.",
    paragraphs: [
      "AA-9053V is the biggest model in the VMS range, with a 400 × 300 × 200 mm envelope on a 700 × 840 × 930 mm frame and a mass of 240 kg. It handles large plates, dies and fabrications that exceed the mid-size stage, while keeping the manual adjustment and long working distance that define the series.",
      "The optics remain the same across the VMS family: industrial CCD camera, 0.7–4.5X manual zoom, 18–188X magnification, 108 mm working distance, and LED surface plus parallel bottom lighting. Scales read to 0.001 mm; accuracy is 2.5 + L/100 µm with 2.5 µm repeatability. Where part size is the only reason to move up, this model gives the extra travel without changing the way the operator works.",
      "The 240 kg frame needs a level, stable floor, and the larger stage should be planned with clearance for loading plates and dies.",
    ],
    bestFor: [
      "Large plates and dies",
      "Fabricated components",
      "Low-volume manual inspection",
      "Parts beyond mid-size stages",
    ],
    scope: [
      "Manual machine with 0.001 mm linear scales",
      "0.7–4.5X zoom lens, 108 mm working distance",
      "LED surface and parallel bottom lighting",
      "Calibration certificate, installation and training",
      "Warranty and delivery terms confirmed in the quotation",
    ],
  },
}

export function getModelCopy(model: string): ModelCopy | undefined {
  return modelCopy[model]
}
