import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Flame, Trophy, Target, BookOpen, Zap, Brain, Activity, Dumbbell, BarChart3, Search, ArrowLeft, Shuffle, Clock, FileText, Layers, Award, Filter, Star, Bookmark, AlertCircle, Sparkles, Settings, Lightbulb } from 'lucide-react';
import { Preferences } from '@capacitor/preferences';
import { CapacitorHttp } from '@capacitor/core';

const storage = {
  async get(key) {
    try {
      const { value } = await Preferences.get({ key });
      return { value };
    } catch {
      return { value: localStorage.getItem(key) };
    }
  },
  async set(key, value) {
    try {
      await Preferences.set({ key, value });
    } catch {
      localStorage.setItem(key, value);
    }
  },
};

// ============================================================
// CURRICULUM — Verified against NSCA Essentials of Strength Training & Conditioning
// (5th ed.) and the CSCS Detailed Content Outline. Research citations from
// Schoenfeld (2017), Morton (2017), Suchomel et al., NSCA Position Stands,
// and ACSM/IOC consensus statements where applicable.
// ============================================================

const CURRICULUM = {
  phase1: {
    id: 'phase1',
    title: 'Phase I — Foundations',
    subtitle: 'Anatomy, Physiology & Bioenergetics',
    color: '#E63946',
    icon: 'Activity',
    description: 'The biological bedrock. Chapters 1, 3, 4 of NSCA Essentials. Roughly 30-35% of Scientific Foundations.',
    domains: [
      {
        id: 'musculoskeletal',
        title: 'Musculoskeletal Anatomy',
        cards: [
          { q: 'What are the three types of muscle tissue?', a: 'Skeletal (voluntary, striated — attached to bones for movement), cardiac (involuntary, striated — heart only), and smooth (involuntary, non-striated — blood vessels, digestive tract, etc.).', tags: ['anatomy', 'foundational'] },
          { q: 'Describe the sliding filament theory of muscle contraction.', a: 'Cross-bridges form between myosin heads and actin filaments. Powered by ATP hydrolysis, myosin heads pivot and pull actin toward the sarcomere center (the "power stroke"). The filaments slide past each other; their lengths do not change. Calcium release from the sarcoplasmic reticulum initiates the cycle by exposing actin binding sites.', tags: ['contraction', 'high-yield', 'foundational'] },
          { q: 'What is a sarcomere?', a: 'The basic contractile unit of skeletal muscle, extending from Z-line to Z-line. Contains overlapping thick (myosin) and thin (actin) filaments. The repeating pattern of sarcomeres creates the striated appearance.', tags: ['anatomy', 'foundational'] },
          { q: 'List the three muscle fiber types and their characteristics.', a: 'Type I (slow-twitch, oxidative): high mitochondrial density, fatigue-resistant, low force/power, high capillarization, red. Type IIa (fast-twitch oxidative-glycolytic): intermediate properties, high force, moderate fatigue resistance. Type IIx (fast-twitch glycolytic): highest force/power, fast fatigue, low oxidative capacity, white.', tags: ['fiber-types', 'high-yield', 'foundational'] },
          { q: 'What occurs at the neuromuscular junction during contraction?', a: 'A motor neuron action potential triggers release of acetylcholine into the synaptic cleft. ACh binds to nicotinic receptors on the sarcolemma, depolarizing it. The action potential travels down T-tubules, triggering Ca²⁺ release from the sarcoplasmic reticulum, which initiates cross-bridge cycling.', tags: ['neural', 'high-yield'] },
          { q: 'Define a motor unit.', a: 'A single alpha motor neuron and all the muscle fibers it innervates. All fibers in a motor unit are the same type. Small motor units (few fibers) allow fine control (e.g., eye muscles); large motor units (hundreds of fibers) produce gross force (e.g., quadriceps).', tags: ['neural', 'high-yield', 'foundational'] },
          { q: 'State Henneman\'s size principle.', a: 'Motor units are recruited in order of size — smallest (Type I) first, progressing to larger (Type IIa, then IIx) as force demands increase. High-threshold motor units are recruited only with heavy loads OR with explosive intent (lift fast, even with lighter weight).', tags: ['neural', 'high-yield', 'foundational'] },
          { q: 'What are the four primary connective tissues that transmit force?', a: 'Endomysium (surrounds individual muscle fibers), perimysium (surrounds fascicles — bundles of fibers), epimysium (surrounds the whole muscle), and tendon (connects muscle to bone). These collectively transmit contractile force to the skeleton.', tags: ['anatomy'] },
          { q: 'Differentiate concentric, eccentric, and isometric muscle actions.', a: 'Concentric: muscle shortens while producing force (lifting a weight). Eccentric: muscle lengthens while producing force (lowering — produces highest force of the three). Isometric: muscle produces force without length change (plank, wall sit). Eccentric actions damage muscle more and create greater hypertrophy stimulus per unit of work.', tags: ['contraction', 'high-yield'] },
          { q: 'What are the planes of motion and corresponding axes?', a: 'Sagittal plane (divides L/R) — movements: flexion/extension — axis: frontal/mediolateral. Frontal/coronal plane (divides front/back) — movements: abduction/adduction, lateral flexion — axis: sagittal. Transverse plane (divides upper/lower) — movements: rotation, pronation/supination — axis: longitudinal/vertical.', tags: ['biomechanics', 'high-yield', 'foundational'] },
          { q: 'Define agonist, antagonist, and synergist.', a: 'Agonist (prime mover): primary muscle producing the desired action (biceps in elbow flexion). Antagonist: muscle that produces the opposite action and may co-contract for joint stability (triceps in elbow flexion). Synergist: assists the agonist or stabilizes joints (brachialis assisting biceps).', tags: ['anatomy', 'high-yield'] },
          { q: 'What are the major joint types and provide examples?', a: 'Fibrous (immovable — skull sutures), cartilaginous (slightly movable — intervertebral discs, pubic symphysis), synovial (freely movable, the joints we train). Synovial subtypes: hinge (elbow, knee), ball-and-socket (shoulder, hip), pivot (atlantoaxial), gliding (carpals), saddle (thumb CMC), condyloid (wrist).', tags: ['anatomy'] },
          { q: 'What is the role of the patella?', a: 'A sesamoid bone embedded in the quadriceps tendon. It increases the moment arm of the quadriceps relative to the knee axis, improving mechanical advantage and thus the torque the quad can produce — particularly in mid-range knee extension.', tags: ['anatomy', 'biomechanics', 'high-yield'] },
        ]
      },
      {
        id: 'bioenergetics',
        title: 'Bioenergetics & Metabolism',
        cards: [
          { q: 'Define bioenergetics.', a: 'The flow of energy within a biological system — specifically, the conversion of macronutrients (carbohydrates, fats, proteins) into biologically usable forms of energy, primarily ATP. ATP is the only form of energy the body can directly use for biological work.', tags: ['energy', 'high-yield', 'foundational'] },
          { q: 'Distinguish anabolic, catabolic, exergonic, and endergonic reactions.', a: 'Anabolic: synthesis of larger molecules from smaller ones (uses energy). Catabolic: breakdown of large molecules into smaller (releases energy). Exergonic: releases energy (typically catabolic). Endergonic: requires energy input (typically anabolic — includes muscle contraction).', tags: ['energy', 'high-yield'] },
          { q: 'Describe ATP hydrolysis.', a: 'ATP + H₂O → ADP + Pi + H⁺ + energy. The terminal phosphate bond is cleaved, releasing energy used for biological work including muscle contraction (cross-bridge cycling). The enzyme ATPase catalyzes this reaction.', tags: ['energy', 'high-yield'] },
          { q: 'Name and characterize the three primary energy systems.', a: 'Phosphagen (ATP-PC) system: anaerobic, no oxygen required, dominates 0-10 seconds of all-out effort, highest power. Glycolytic system: anaerobic, breaks down glucose/glycogen to pyruvate/lactate, dominates ~10s-2min, high power but limited capacity. Oxidative (aerobic) system: requires oxygen, uses CHO/fat/protein, dominates >2 minutes, low power but virtually unlimited capacity.', tags: ['energy', 'high-yield', 'foundational'] },
          { q: 'Describe the phosphagen system in detail.', a: 'Uses ATP stored in muscle (~5 sec of work) and creatine phosphate (CP) to rapidly resynthesize ATP via the creatine kinase reaction: CP + ADP → ATP + creatine. No oxygen, no lactate. Highest rate of ATP production. Stores deplete in ~10-15 seconds of maximal effort. Full CP repletion takes ~3-5 minutes.', tags: ['energy', 'high-yield'] },
          { q: 'Walk through fast glycolysis.', a: 'Glucose (from blood) or glycogen (from muscle) is broken down through 10-step pathway in cytoplasm to pyruvate. When energy demand exceeds aerobic capacity, pyruvate is reduced to lactate (NADH gives up electrons to regenerate NAD⁺ so glycolysis can continue). Yields 2 ATP per glucose (3 per glycogen since no glucose-6-phosphate step). Generates H⁺ ions contributing to acidosis.', tags: ['energy', 'high-yield'] },
          { q: 'How does slow glycolysis differ from fast glycolysis?', a: 'In slow glycolysis (sufficient oxygen present), pyruvate enters the mitochondria and is converted to acetyl-CoA, then enters the Krebs cycle for oxidative phosphorylation. No lactate is produced. Slow glycolysis produces more ATP per glucose but at a slower rate.', tags: ['energy'] },
          { q: 'What is the net ATP yield per glucose from each system?', a: 'Phosphagen: 1 ATP per CP molecule (not really "per glucose"). Anaerobic glycolysis: net 2 ATP per glucose (3 per glycogen). Aerobic oxidation of glucose: ~30-32 ATP (older texts cite ~36-38; modern accounting accounts for transport costs). Fatty acid oxidation produces even more — e.g., palmitate yields ~106 ATP.', tags: ['energy', 'high-yield'] },
          { q: 'What are the two phases of the oxidative system?', a: 'Krebs cycle (citric acid/TCA cycle): acetyl-CoA enters, produces CO₂, NADH, FADH₂, and 1 GTP (≈ATP) per turn. Electron transport chain: NADH/FADH₂ donate electrons through complexes, pumping H⁺ across the inner mitochondrial membrane; ATP synthase uses the proton gradient to generate ATP (oxidative phosphorylation). Final electron acceptor is O₂, forming H₂O.', tags: ['energy', 'high-yield'] },
          { q: 'Describe lactate production and its role.', a: 'Lactate is produced from pyruvate during fast glycolysis to regenerate NAD⁺. Lactate is NOT a metabolic waste — it is a valuable fuel: shuttled to other muscles and the heart for oxidation, or to the liver for conversion back to glucose (Cori cycle). The "burn" of training is caused by H⁺ ion accumulation (acidosis), not lactate itself.', tags: ['energy', 'high-yield'] },
          { q: 'What is the lactate threshold?', a: 'The exercise intensity at which blood lactate begins to accumulate faster than it can be cleared (~2-4 mmol/L). Reflects the shift from primarily aerobic to anaerobic metabolism. A higher lactate threshold (% of VO2max) indicates better endurance performance and is highly trainable.', tags: ['energy', 'high-yield'] },
          { q: 'Define EPOC.', a: 'Excess Post-exercise Oxygen Consumption — elevated O₂ uptake after exercise used to restore the body to baseline. Functions: replenish ATP/CP, clear lactate, restore oxygen stores to myoglobin and hemoglobin, elevated body temperature, elevated heart rate/breathing, and elevated catecholamines. Magnitude scales with exercise intensity more than duration.', tags: ['energy', 'recovery'] },
          { q: 'Explain the Cori cycle.', a: 'Lactate produced in muscle travels via blood to the liver. Liver converts lactate back to glucose via gluconeogenesis (energy-requiring). Glucose is released back into circulation and returns to muscle. Allows continued anaerobic ATP production despite limited muscle glucose stores during sustained effort.', tags: ['energy'] },
          { q: 'How long does full glycogen replenishment take after depletion?', a: 'Roughly 24 hours when carbohydrate intake is adequate (6-10 g/kg/day for hard-training athletes). Faster early replenishment (~5% per hour) in the first few hours post-exercise when CHO is consumed. Important consideration for athletes training twice daily.', tags: ['energy', 'nutrition'] },
          { q: 'What is metabolic specificity of training?', a: 'Energy system adaptations are specific to the bioenergetic demands of training. Short, max-effort work develops phosphagen and glycolytic capacities. Sustained sub-maximal work develops oxidative capacity. Programming work:rest ratios targets the desired system. This is why sport-specific conditioning matters.', tags: ['energy', 'high-yield'] },
        ]
      },
      {
        id: 'endocrine',
        title: 'Endocrine Response',
        cards: [
          { q: 'Which hormones are most acutely elevated by resistance training?', a: 'Testosterone, growth hormone (GH), insulin-like growth factor 1 (IGF-1), cortisol, and catecholamines (epinephrine, norepinephrine). High-volume, large muscle mass, multi-joint exercises with short rest intervals produce the largest acute spikes.', tags: ['endocrine', 'high-yield'] },
          { q: 'What is the current evidence on acute hormone response and hypertrophy?', a: 'Once thought central, acute post-workout hormone spikes are now considered minor drivers of hypertrophy in the long term. Mechanical tension (training stimulus), volume, and proximity to failure are more important. Chronic resting hormone levels matter more than transient post-exercise peaks.', tags: ['endocrine', 'high-yield'] },
          { q: 'How does testosterone influence muscle?', a: 'Increases protein synthesis, decreases protein breakdown, enhances neural drive, stimulates GH release, and may increase satellite cell activity. Higher baseline levels correlate with greater hypertrophy and strength potential. Resistance training acutely elevates it; chronic training maintains favorable resting levels.', tags: ['endocrine'] },
          { q: 'What is cortisol\'s role in training?', a: 'Catabolic glucocorticoid released by the adrenal cortex. Acute elevation mobilizes glucose and amino acids for energy — useful during exercise. Chronically elevated cortisol (from overtraining, poor sleep, life stress) suppresses immunity, impairs recovery, blunts hypertrophy, and may reduce testosterone:cortisol ratio (T:C — a fatigue marker).', tags: ['endocrine', 'high-yield'] },
          { q: 'Describe insulin\'s role post-exercise.', a: 'Anabolic peptide hormone from the pancreas. Drives glucose into muscle cells (via GLUT4 translocation) and stimulates protein synthesis. Carbohydrate + protein post-workout accelerates glycogen repletion and creates a favorable anabolic environment.', tags: ['endocrine', 'nutrition'] },
          { q: 'What is the catecholamine response to exercise?', a: 'Epinephrine and norepinephrine rise with exercise intensity. Increase HR, blood pressure, glycogenolysis, lipolysis, vasoconstriction (to non-active areas), and bronchodilation. Prime the body for high-intensity work and contribute to the "fight or flight" arousal needed for max efforts.', tags: ['endocrine'] },
          { q: 'How does growth hormone affect training adaptation?', a: 'Secreted by anterior pituitary, mostly during deep sleep. Stimulates IGF-1 release from the liver (which has more direct anabolic effects). Promotes lipolysis, protein synthesis, and connective tissue growth. Sleep deprivation severely blunts GH release.', tags: ['endocrine'] },
        ]
      },
      {
        id: 'cardio',
        title: 'Cardiovascular & Respiratory',
        cards: [
          { q: 'State the cardiac output equation and explain each variable.', a: 'Q = HR × SV. Cardiac output (L/min) = heart rate (beats/min) × stroke volume (L/beat). Q can increase 4-6 fold during exercise (from ~5 L/min at rest to 20-30 L/min). Endurance training increases SV more than HR.', tags: ['cardio', 'high-yield', 'foundational'] },
          { q: 'Define VO2max and its determinants.', a: 'Maximum rate of oxygen consumption during incremental exercise to exhaustion. Highly heritable (~50% genetic). Limited by central factors (cardiac output, hemoglobin) more than peripheral. Typical untrained: 35-45 mL/kg/min; elite endurance: 70-85+ mL/kg/min.', tags: ['cardio', 'high-yield'] },
          { q: 'State and explain the Fick equation.', a: 'VO₂ = Q × (a-vO₂ difference). Oxygen consumption equals cardiac output multiplied by the arteriovenous oxygen difference (the difference in O₂ content between arterial and venous blood — how much O₂ is extracted by tissues). Training improves both Q and a-vO₂.', tags: ['cardio', 'high-yield'] },
          { q: 'List the chronic adaptations to aerobic endurance training.', a: 'Central: increased SV, increased plasma volume, decreased resting/submaximal HR, increased VO2max, cardiac eccentric hypertrophy (enlarged chamber). Peripheral: increased capillary density (10-15%+), increased mitochondrial density and size, increased oxidative enzyme activity, increased myoglobin, improved fat oxidation. Lactate threshold shifts to higher % of VO2max.', tags: ['cardio', 'adaptation', 'high-yield'] },
          { q: 'Compare concentric and eccentric cardiac hypertrophy.', a: 'Concentric (resistance training, pressure overload): ventricular wall thickens, chamber size relatively unchanged. Adapts to high-pressure transient demands. Eccentric (endurance training, volume overload): chamber enlarges, wall thickness increases proportionally. Adapts to high-volume sustained demands. Both are healthy adaptations.', tags: ['cardio', 'adaptation', 'high-yield'] },
          { q: 'What is the rate-pressure product (double product)?', a: 'RPP = HR × Systolic BP. Estimates myocardial oxygen demand. Used clinically to assess cardiac workload. Resistance training, especially with Valsalva, can produce extremely high RPPs — a consideration for clients with cardiovascular disease.', tags: ['cardio'] },
          { q: 'How does the respiratory system respond acutely to exercise?', a: 'Tidal volume and respiratory rate both increase, raising minute ventilation from ~6 L/min at rest to >120 L/min in trained athletes. Oxygen extraction at the alveoli increases. In healthy individuals, the respiratory system is NOT typically the limiting factor in performance — cardiac output and peripheral O₂ extraction are.', tags: ['cardio'] },
          { q: 'Define the Valsalva maneuver and its training implications.', a: 'Forceful exhalation against a closed glottis. Increases intra-abdominal/thoracic pressure, providing spinal stability during heavy lifts. Causes rapid spike in blood pressure (>300/200 mmHg has been recorded). Useful briefly during max effort lifts; contraindicated for cardiovascular populations.', tags: ['cardio', 'high-yield'] },
        ]
      },
    ]
  },
  phase2: {
    id: 'phase2',
    title: 'Phase II — Biomechanics',
    subtitle: 'Force production & application',
    color: '#F77F00',
    icon: 'Zap',
    description: 'Chapter 2 of NSCA Essentials. The physics of how the body produces and applies force.',
    domains: [
      {
        id: 'biomech-basics',
        title: 'Newtonian Mechanics & Levers',
        cards: [
          { q: 'State Newton\'s three laws in the context of sport.', a: 'First (Inertia): a body remains at rest or in uniform motion unless acted upon by a net external force. Second (F = ma): the acceleration of an object equals net force divided by mass. Third (Action-Reaction): for every action there is an equal and opposite reaction — the ground reaction force during sprinting/jumping.', tags: ['biomechanics', 'high-yield', 'foundational'] },
          { q: 'What is a moment arm?', a: 'The perpendicular distance from the line of force action to the axis of rotation (joint). Also called lever arm, force arm, or torque arm. Longer moment arm = greater torque from the same force. The biceps moment arm changes throughout a curl, peaking at ~90° elbow flexion.', tags: ['biomechanics', 'high-yield', 'foundational'] },
          { q: 'Define torque and its equation.', a: 'Rotational force — what actually moves joints. Torque (τ) = Force × Moment Arm (τ = F × d). All human movement is rotational at the joints. Maximizing torque means optimizing both muscle force AND moment arm length.', tags: ['biomechanics', 'high-yield'] },
          { q: 'Describe the three classes of levers with body examples.', a: 'Class 1 (axis between force and resistance): triceps extension — olecranon as fulcrum, triceps force on one side, hand load on other. Class 2 (resistance between axis and force): calf raise — ball of foot is axis, body weight resistance is middle, calf force at heel — mechanical advantage. Class 3 (force between axis and resistance): biceps curl — elbow axis, biceps force in middle, hand load at end — mechanical disadvantage but greater speed. MOST musculoskeletal levers are class 3.', tags: ['biomechanics', 'high-yield', 'foundational'] },
          { q: 'What is mechanical advantage?', a: 'The ratio of the moment arm of the applied (muscle) force to the moment arm of the resistive force. MA > 1.0: muscle force can be less than the resistance (class 2 levers). MA < 1.0: muscle force must exceed the resistance (most class 3 levers — most of the human body). Lower MA but greater speed and range of motion.', tags: ['biomechanics', 'high-yield'] },
          { q: 'Why do most human muscles operate at a mechanical disadvantage?', a: 'Because the body sacrifices force for speed and range of motion. With insertion points close to the joint (short moment arm), small muscle contractions create large limb displacements at the end of the limb. The biceps insertion is just a few cm from the elbow — a small contraction lifts the hand many inches.', tags: ['biomechanics'] },
          { q: 'What is the difference between work and power?', a: 'Work (W) = Force × Distance (scalar; joules). The total energy transferred. Power (P) = Work / Time = Force × Velocity (watts). The rate of doing work. Two athletes can do identical work — same weight, same distance — but with different power outputs depending on speed.', tags: ['biomechanics', 'high-yield'] },
          { q: 'Define impulse and momentum.', a: 'Impulse = Force × Time (N·s). Equal to the change in momentum (m × v) of an object. In sport, both how hard AND how long you push matter — a sprinter\'s ground contact creates impulse that changes their momentum. Longer ground contact = more impulse, but slower stride rate.', tags: ['biomechanics', 'high-yield'] },
          { q: 'Distinguish strength, power, and rate of force development.', a: 'Strength: maximum force a muscle can produce (no time constraint). Power: rate of doing work (force × velocity). RFD (rate of force development): how quickly force is developed (Δforce/Δtime). RFD is critical because most sport actions allow <300 ms to produce force — far less than the ~600-800 ms needed to reach max force.', tags: ['biomechanics', 'high-yield', 'foundational'] },
        ]
      },
      {
        id: 'force-curves',
        title: 'Force-Velocity & Length-Tension',
        cards: [
          { q: 'Describe the force-velocity curve.', a: 'Inverse relationship: as concentric contraction velocity increases, force-producing capacity decreases. Maximum force is achieved at zero velocity (isometric/max strength). Maximum velocity is reached at near-zero load (unloaded movement). Eccentric actions can produce ~1.3-1.8× concentric maximum force.', tags: ['force-velocity', 'high-yield', 'foundational'] },
          { q: 'Name the five zones of the force-velocity curve and example training methods.', a: '1) Absolute Strength (max force, near-zero velocity): 1RM lifts. 2) Strength-Speed (high force, moderate velocity): heavy clean pulls, 80-90% lifts. 3) Peak Power (balanced — peak F×V product): power cleans, jump squats at 30-50% 1RM. 4) Speed-Strength (moderate force, high velocity): med ball throws, light loaded jumps. 5) Absolute Speed (low force, max velocity): unloaded sprinting, jumping, throwing.', tags: ['force-velocity', 'high-yield', 'foundational'] },
          { q: 'What is the length-tension relationship?', a: 'Muscle produces maximum force at an optimal length where actin-myosin filament overlap allows maximum cross-bridge formation. Force declines when too short (filaments collide/overlap themselves) or too long (insufficient overlap). Explains weak points in lifts: bottom of squat, top of bench, end-range curl.', tags: ['biomechanics', 'high-yield', 'foundational'] },
          { q: 'Define rate of force development (RFD).', a: 'The slope of the force-time curve — how quickly force is produced. Critical because sport actions allow milliseconds, not seconds. Ground contact in sprinting is ~80-100 ms; reaching maximum force takes 600-800 ms. Two athletes with the same 1RM can have very different RFDs and very different sport performance.', tags: ['rfd', 'high-yield', 'foundational'] },
          { q: 'Define and explain the stretch-shortening cycle (SSC).', a: 'A rapid eccentric (lengthening) muscle action immediately followed by concentric (shortening) action produces greater force than concentric alone. Three contributing mechanisms: (1) stored elastic energy in tendons and cross-bridges, (2) stretch reflex potentiation via muscle spindles, (3) time to develop force during the eccentric phase. The basis of plyometric training.', tags: ['ssc', 'high-yield', 'foundational'] },
          { q: 'Distinguish slow SSC from fast SSC.', a: 'Slow SSC: ground contact >250 ms (countermovement jump, change of direction). Fast SSC: ground contact <250 ms (sprinting, depth jumps, drop jumps). Train both — they involve different neural and tissue qualities. Fast SSC requires already-established slow SSC capacity.', tags: ['ssc', 'high-yield'] },
          { q: 'What are the three phases of a plyometric movement?', a: 'Eccentric (loading phase — muscle lengthens, elastic energy stored). Amortization (transition phase — must be brief to capture stored energy; longer transition = lost potential). Concentric (unloading phase — explosive shortening). Coaching plyos = minimize amortization time.', tags: ['plyometrics', 'high-yield'] },
          { q: 'What is the cross-bridge cycle?', a: '(1) ATP binds myosin head, detaching it from actin. (2) ATP hydrolysis cocks myosin head into high-energy state. (3) Myosin binds actin (cross-bridge). (4) Power stroke: ADP/Pi released, myosin pivots, pulling actin. (5) New ATP binds, detaching myosin. Repeat. Requires Ca²⁺ to expose actin binding sites.', tags: ['contraction'] },
        ]
      },
      {
        id: 'movement-analysis',
        title: 'Movement Analysis & Resistance',
        cards: [
          { q: 'Distinguish kinematic from kinetic analysis.', a: 'Kinematic: describes motion (position, velocity, acceleration, joint angles) without examining cause. Kinetic: examines the forces causing motion (ground reaction force, joint torques, internal muscle forces). Both inform technique analysis.', tags: ['biomechanics'] },
          { q: 'What is ground reaction force (GRF)?', a: 'The force the ground exerts on a body in contact with it — equal and opposite to the force the body applies (Newton\'s third law). Vertical GRF in running peaks at 2.5-3× bodyweight; in sprinting and jumping can reach 5-6× bodyweight or more.', tags: ['biomechanics', 'high-yield'] },
          { q: 'Define center of mass and base of support.', a: 'Center of mass (COM): point where the body\'s mass is evenly distributed in all directions — in anatomical position, sits roughly at the sacrum (slightly anterior to S2). Moves with limb position. Base of support (BOS): area under the body bounded by points of contact. Stability increases with wider BOS and lower COM.', tags: ['biomechanics'] },
          { q: 'What is a sticking point?', a: 'The position in a lift where the lifter is mechanically weakest — typically where moment arms are longest, leverage is worst, or active muscles are at suboptimal length. Examples: just above parallel in a squat, mid-range in a bench press. Often determines max load.', tags: ['biomechanics'] },
          { q: 'Compare open and closed kinetic chain exercises.', a: 'Open kinetic chain (OKC): distal segment moves freely (knee extension, leg curl, biceps curl). Typically single-joint, isolation work. Closed kinetic chain (CKC): distal segment is fixed against resistance (squat, deadlift, push-up). Typically multi-joint, more sport-specific, generally lower joint shear forces.', tags: ['biomechanics', 'high-yield'] },
          { q: 'What is bracketing in resistance training?', a: 'Deliberately altering movement speed to bias training toward force or velocity. Faster (overspeed) — bracketing the velocity side. Slower (underspeed) — bracketing the force side. Used to develop targeted qualities along the force-velocity curve.', tags: ['biomechanics'] },
          { q: 'Define inertia and explain free weights vs machines.', a: 'Inertia (Newton\'s first law) is an object\'s resistance to change in motion. Free weights have constant gravitational load but variable inertial demands depending on how fast you move them — accelerate the bar more, more force required. Machines often eliminate inertia, providing more consistent resistance through the ROM but less neuromuscular complexity.', tags: ['biomechanics'] },
          { q: 'What is variable resistance and how is it applied?', a: 'Resistance changes throughout the ROM to better match the strength curve. Bands (more resistance at lengthened muscle), chains (more resistance at top of lift), cam machines (mechanical variation). Useful for matching sticking points or training accommodating resistance (Westside method).', tags: ['biomechanics'] },
          { q: 'Compare strength-to-mass ratio in different athletes.', a: 'Absolute strength: total force production (favored by larger athletes — strongman, heavyweight powerlifters). Relative strength: strength per unit bodyweight (critical for jumping, sprinting, climbing). A 70 kg athlete who deadlifts 200 kg has higher relative strength than a 120 kg athlete who deadlifts 250 kg.', tags: ['biomechanics', 'high-yield'] },
        ]
      },
    ]
  },
  phase3: {
    id: 'phase3',
    title: 'Phase III — Adaptations & Recovery',
    subtitle: 'How the body responds to training',
    color: '#FCBF49',
    icon: 'Brain',
    description: 'Chapters 5, 6, 7 of NSCA Essentials. Anaerobic, aerobic, and special population adaptations.',
    domains: [
      {
        id: 'principles',
        title: 'Foundational Training Principles',
        cards: [
          { q: 'What does SAID stand for?', a: 'Specific Adaptation to Imposed Demands. The body adapts specifically to the type and pattern of stress placed on it. Train slowly → become better at slow work. Train heavy → become strong at heavy. Drives exercise selection, velocity matching, and sport specificity.', tags: ['principles', 'high-yield', 'foundational'] },
          { q: 'Define progressive overload and its mechanisms.', a: 'Systematically increasing training demands to drive continued adaptation. Variables to manipulate: load (most common), volume (sets × reps), frequency, density (work/rest), range of motion, tempo, exercise complexity, proximity to failure. The principle is universal; the lever varies.', tags: ['principles', 'high-yield', 'foundational'] },
          { q: 'Describe the General Adaptation Syndrome (GAS).', a: 'Hans Selye\'s 3-stage model of stress response: (1) Alarm — initial drop in function due to stress. (2) Resistance — adaptation occurs, function rises above baseline. (3) Exhaustion — if stress continues without recovery, function declines and pathology occurs. Underpins periodization theory.', tags: ['principles', 'high-yield'] },
          { q: 'Explain the supercompensation model.', a: 'After a training stimulus: (1) fitness initially drops due to fatigue; (2) recovery returns function to baseline; (3) supercompensation lifts function above baseline; (4) if next stimulus doesn\'t come, returns to baseline. Optimal training applies the next dose during the supercompensated window.', tags: ['principles', 'high-yield'] },
          { q: 'Differentiate functional overreaching, non-functional overreaching, and overtraining.', a: 'Functional overreaching: short-term planned overload causing temporary performance drop; supercompensates with rest (days to weeks). Non-functional overreaching: longer recovery (weeks to months) without performance gain. Overtraining syndrome: maladaptive state requiring months to recover; hormonal, immune, psychological consequences.', tags: ['recovery', 'high-yield'] },
          { q: 'State the principle of individuality.', a: 'Athletes respond differently to identical training based on genetics, training history, recovery capacity, age, sex, sleep, nutrition, and life stress. No "best" program exists — only programs better suited to specific athletes in specific contexts.', tags: ['principles'] },
          { q: 'What is reversibility (detraining)?', a: 'Adaptations regress when training stops. Strength can be largely maintained for 2-4 weeks with reduced volume. VO2max declines ~7% in 12 days of inactivity. Hypertrophy persists longer than strength expression. "Use it or lose it" — but with retraining, gains return faster than initial acquisition (muscle memory).', tags: ['principles'] },
          { q: 'Explain the principle of variation.', a: 'Sustained training adaptation requires variation in stimulus to prevent accommodation (the law of diminishing returns where the same stimulus produces less response over time). Variation can be in exercise selection, intensity, volume, tempo, or rest. Periodization is structured variation.', tags: ['principles'] },
        ]
      },
      {
        id: 'neural-hypertrophy',
        title: 'Neural & Muscular Adaptations',
        cards: [
          { q: 'List the neural adaptations to strength training.', a: 'Increased motor unit recruitment (especially high-threshold), increased rate coding (firing frequency), motor unit synchronization, reduced antagonist co-activation, improved intermuscular coordination, possible reduction of Golgi tendon organ inhibition, improved central nervous system drive.', tags: ['neural', 'high-yield', 'foundational'] },
          { q: 'Why do beginners get strong rapidly without much muscle growth?', a: 'Early gains are primarily neural — better recruitment, rate coding, and coordination of existing muscle mass. Hypertrophy contributes meaningfully after ~4-8 weeks of consistent training. Beginners can gain noticeable strength in 2-3 weeks before any measurable muscle growth.', tags: ['neural', 'high-yield'] },
          { q: 'What are the three primary drivers of hypertrophy?', a: '(1) Mechanical tension — high force on the muscle through the ROM (the most important by current evidence). (2) Metabolic stress — accumulation of metabolites in high-rep work. (3) Muscle damage — contributes via repair signaling but excessive damage hinders recovery. All driven primarily through sufficient volume close to failure.', tags: ['hypertrophy', 'high-yield', 'foundational'] },
          { q: 'What weekly set volume optimizes hypertrophy?', a: 'Schoenfeld et al. (2017) meta-analysis: 10+ sets per muscle per week significantly outperforms <5 sets. Current evidence suggests roughly 10-20 hard sets per muscle group per week for most trained lifters, with diminishing returns and possible regression above ~25-30 sets. Sets must be taken close to failure (≤4 RIR) to count meaningfully.', tags: ['hypertrophy', 'high-yield'] },
          { q: 'How does training frequency affect hypertrophy?', a: 'When weekly volume is equated, training each muscle 2+ times per week produces slightly greater hypertrophy than once per week (Schoenfeld et al. 2016 meta-analysis), likely due to better per-session quality and protein synthesis frequency. The effect is modest — volume matters more than frequency.', tags: ['hypertrophy', 'high-yield'] },
          { q: 'Define sarcoplasmic vs myofibrillar hypertrophy.', a: 'Sarcoplasmic: increase in non-contractile content (sarcoplasm, glycogen, water, organelles). Myofibrillar: increase in contractile proteins (actin, myosin) within myofibrils — proportionally more strength gained per unit growth. Both occur with training; the proportion may differ between training styles, though direct evidence is limited.', tags: ['hypertrophy'] },
          { q: 'How quickly does muscle protein synthesis respond to training?', a: 'MPS elevates within 1-3 hours post-training and remains elevated for 24-48 hours in trained lifters (longer in untrained: up to 72 hrs). Visible/measurable hypertrophy typically begins ~3-8 weeks of consistent overload. Volume across these windows drives the long-term outcome.', tags: ['hypertrophy'] },
          { q: 'Can fiber type be changed with training?', a: 'Substantial conversion: Type IIx → Type IIa with resistance training (IIx fibers become more oxidative). Limited conversion: Type II ↔ Type I (genetics largely determines this ratio). Sprint training can shift toward IIa from IIx; endurance training may push some IIa toward Type I-like properties.', tags: ['fiber-types', 'high-yield'] },
          { q: 'What is satellite cell activation?', a: 'Satellite cells are skeletal muscle stem cells dormant under the basal lamina. Mechanical loading activates them; they proliferate and either fuse with existing fibers (donating nuclei to support hypertrophy) or repair damaged fibers. More myonuclei per fiber = greater hypertrophy potential.', tags: ['hypertrophy'] },
        ]
      },
      {
        id: 'recovery-nutrition',
        title: 'Recovery & Nutrition',
        cards: [
          { q: 'What is the evidence-based protein intake for hypertrophy?', a: 'Morton et al. (2017) meta-analysis (49 studies, 1863 participants): benefits of protein supplementation plateau at ~1.6 g/kg/day, with the 95% CI extending to ~2.2 g/kg. Current consensus: 1.6-2.2 g/kg/day for trained individuals seeking hypertrophy. Higher intakes (up to 3+ g/kg) are safe but unlikely to add further gains.', tags: ['nutrition', 'high-yield', 'foundational'] },
          { q: 'How should protein be distributed across meals?', a: '0.4-0.55 g/kg per meal across 4-5 meals maximizes 24-hour MPS more than skewed intake. Leucine threshold (~2.5-3 g per meal) triggers MPS via mTOR pathway. Distribution matters more than the "anabolic window" — total daily intake + meal distribution > immediate post-workout timing.', tags: ['nutrition', 'high-yield'] },
          { q: 'What is the current view of the "anabolic window"?', a: 'The post-workout window for nutrition was once thought to be ~30 minutes. Current evidence (Aragon & Schoenfeld) shows it\'s much wider — likely several hours. If a pre-workout meal was eaten, the window extends further. Total daily protein intake and distribution matter more than timing within an hour of training.', tags: ['nutrition'] },
          { q: 'What carbohydrate intake supports hard training?', a: 'For moderate-to-high training volume: 5-7 g/kg/day. For very high volume endurance training: 8-12 g/kg/day. Athletes in short-duration, lower-volume training (e.g., sprinters, lifters) may need less (3-5 g/kg). CHO is essential for glycogen replenishment and high-intensity performance.', tags: ['nutrition'] },
          { q: 'What hydration level impairs performance?', a: 'As little as 2% body mass loss in water impairs strength, power, and endurance. Cognitive function declines even sooner. Pre-exercise: 5-7 mL/kg 4 hours pre. During: 0.4-0.8 L/hour depending on conditions. Post: 1.25-1.5 L per kg lost.', tags: ['nutrition'] },
          { q: 'Why is sleep critical for adaptation?', a: 'GH peaks during slow-wave (deep) sleep. Sleep deprivation: decreases testosterone, increases cortisol, impairs glycogen replenishment, slows muscle protein synthesis, decreases reaction time and motor learning, increases injury rate. 7-9 hours is the evidence-based minimum for athletes; many need more.', tags: ['recovery', 'high-yield'] },
          { q: 'What are the most evidence-backed performance supplements?', a: 'Creatine monohydrate (3-5 g/day, with or without loading) — increases strength, power, lean mass via increased intramuscular CP. Caffeine (3-6 mg/kg, 30-60 min pre) — improves performance across modalities. Beta-alanine (3-6 g/day) — buffers H⁺, helps 60s-4min efforts. Sodium bicarbonate (300 mg/kg, 60-90 min pre) — buffers acidosis for short-medium high-intensity efforts. Whey/protein — if dietary protein is insufficient.', tags: ['nutrition', 'high-yield'] },
          { q: 'How does creatine monohydrate work?', a: 'Increases intramuscular creatine phosphate stores by ~20%. Faster CP-ATP resynthesis = more reps with heavy weights, faster recovery between sets. Also draws water into muscle (cell volumization). Mechanism likely both direct (energy) and indirect (more volume tolerance). Most evidence-supported sports supplement after caffeine.', tags: ['nutrition'] },
          { q: 'List symptoms of overtraining syndrome.', a: 'Persistent fatigue, declining performance despite training, elevated resting HR, decreased HRV, mood disturbances (irritability, depression), sleep disruption, appetite changes, increased illness/injury, reduced testosterone:cortisol ratio, decreased motivation, and chronic muscle soreness.', tags: ['recovery'] },
          { q: 'What is Relative Energy Deficiency in Sport (RED-S)?', a: 'IOC consensus (2014, 2018, 2023): impaired physiological function caused by chronic low energy availability. Affects metabolic rate, menstrual function, bone health, immunity, protein synthesis, cardiovascular health, and psychological function. Replaced and expanded the older "Female Athlete Triad" (LEA + menstrual dysfunction + low BMD) — now recognized to affect both sexes.', tags: ['nutrition', 'special-pops', 'high-yield'] },
        ]
      },
      {
        id: 'energy-systems-training',
        title: 'Energy System Development',
        cards: [
          { q: 'What work:rest ratio targets the phosphagen system?', a: '~1:12 to 1:20 (e.g., 5-10s work, 60-180s rest). Allows near-complete CP replenishment for repeated max-effort bouts. Used for max strength, power, sprint work, jump training. Quality of effort >> work density.', tags: ['conditioning', 'high-yield'] },
          { q: 'What work:rest ratio targets the glycolytic system?', a: '~1:3 to 1:5 (e.g., 30s work, 90s-2.5min rest). Develops lactate tolerance and capacity to sustain high-power output. Used in middle-distance events and certain anaerobic conditioning protocols.', tags: ['conditioning', 'high-yield'] },
          { q: 'What work:rest ratio targets the oxidative system?', a: '~1:1 to 1:3 (e.g., 60-180s work, 60-180s rest), or sustained continuous work at submaximal intensities. Develops aerobic capacity, lactate threshold, and recovery between high-intensity bouts.', tags: ['conditioning'] },
          { q: 'Describe the interference effect.', a: 'Concurrent high-volume endurance training can blunt strength and hypertrophy adaptations — primarily via AMPK-mTOR signaling antagonism and shared central fatigue. Magnitude depends on training mode (running > cycling for interference), volume, and recovery between sessions. Separate strength and endurance by 6+ hours when possible.', tags: ['conditioning', 'high-yield'] },
          { q: 'How is the interference effect minimized?', a: '(1) Strength training BEFORE endurance in any combined session. (2) Separate the modalities by 6-24 hours when possible. (3) Prioritize cycling/swimming over running for endurance work in strength athletes. (4) Manage total volume carefully — interference scales with endurance dose. (5) Cluster endurance early in the week if competing in a strength-dominant sport.', tags: ['conditioning'] },
          { q: 'What is HIIT and what does it develop?', a: 'High-Intensity Interval Training: alternating bouts of near-max effort (>85% VO2max or HRmax) with active or passive recovery. Improves VO2max, lactate threshold, anaerobic capacity, and glycolytic efficiency in less total time than steady-state. Does not replace sport-specific conditioning.', tags: ['conditioning'] },
          { q: 'What is Tabata-style training and its origins?', a: 'Originally: 20 sec all-out work / 10 sec rest × 8 rounds (4 minutes) on a cycle ergometer at ~170% VO2max. Tabata et al. (1996) showed it improved both VO2max and anaerobic capacity. The protocol is often misapplied (lower intensities labeled "Tabata"); the original required maximal effort.', tags: ['conditioning'] },
          { q: 'How does long-slow distance (LSD) training differ from HIIT?', a: 'LSD: sustained intensity at 60-80% HRmax for prolonged durations. Develops aerobic base, capillarization, mitochondrial density, fat oxidation, slow-twitch fiber adaptation. HIIT: brief max efforts. Develops VO2max, lactate threshold, anaerobic capacity. Both have a place — most elite endurance programs use ~80% LSD / 20% HIIT (polarized training).', tags: ['conditioning'] },
        ]
      },
    ]
  },
  phase4: {
    id: 'phase4',
    title: 'Phase IV — Program Design',
    subtitle: 'Applying the science to training plans',
    color: '#06A77D',
    icon: 'Dumbbell',
    description: 'Chapters 17-22 of NSCA Essentials. The largest portion of the Practical/Applied exam.',
    domains: [
      {
        id: 'needs-analysis',
        title: 'Needs Analysis',
        cards: [
          { q: 'What are the two components of a needs analysis?', a: '(1) Sport analysis: movement patterns, primary muscle actions, energy system demands, common injury sites, biomechanical demands. (2) Athlete analysis: training age, injury history, performance testing results, current training phase, individual goals, and current physiological/psychological status.', tags: ['programming', 'high-yield', 'foundational'] },
          { q: 'How are sport energy system demands assessed?', a: 'Examine the time motion characteristics: average play/effort duration, work:rest ratios, total game time, intensity distribution. Football: phosphagen-dominant (4-8 sec plays, ~30s rest). Soccer: mixed (aerobic base, repeated high-intensity sprints). Marathon: oxidative. Wrestling: high glycolytic. Basketball: alternating phosphagen and aerobic recovery.', tags: ['sport-specific', 'high-yield'] },
          { q: 'How does training age affect program design?', a: 'Untrained (<1 year): rapid neural adaptation; simple linear progressions; 2-3 days/week; focus on movement quality. Intermediate (1-3 years): more variation needed; consistent progression slows. Advanced (3+ years): requires sophisticated periodization, higher volumes, smaller progressions, specialized accessories.', tags: ['programming', 'high-yield'] },
          { q: 'What movement patterns should be assessed in any athlete?', a: 'Squat (bilateral and unilateral knee/hip dominant), hinge (deadlift/hip flexion), upper push (vertical and horizontal), upper pull (vertical and horizontal), carry, anti-rotation/anti-extension core, locomotion (sprint/run gait). Pattern integrity precedes load.', tags: ['programming', 'high-yield'] },
          { q: 'What are common injury sites for major sports?', a: 'Football: knee (ACL/MCL), shoulder, concussion. Soccer: hamstring, knee, ankle. Baseball: rotator cuff, elbow (UCL). Basketball: ankle, knee. Track sprinters: hamstring. Endurance runners: knee (PFP, IT band), shin (stress fracture), achilles. Knowing this guides prehab.', tags: ['sport-specific'] },
        ]
      },
      {
        id: 'acute-variables',
        title: 'Acute Training Variables',
        cards: [
          { q: 'What loading parameters target maximum strength?', a: 'Load: ≥85% 1RM (NSCA) — typically 1-6 reps. Sets: 2-6. Rest: 2-5 minutes (full neural recovery). Frequency: 2-3 sessions/week per movement pattern. Focus: heavy compound lifts (squat, deadlift, bench, press, row, clean), high neural demand.', tags: ['programming', 'high-yield', 'foundational'] },
          { q: 'What loading parameters target hypertrophy?', a: 'Load: 67-85% 1RM (NSCA) — typically 6-12 reps. Sets: 3-6 per exercise. Rest: 30s-90s for high metabolic stress, or up to 2 min to maintain quality. Frequency: 2+ sessions/week per muscle. Volume drives results: 10-20 hard sets per muscle/week is the evidence-based range.', tags: ['programming', 'high-yield', 'foundational'] },
          { q: 'What loading parameters target muscular endurance?', a: 'Load: ≤67% 1RM — typically ≥12 reps. Sets: 2-3. Rest: ≤30s. Frequency: 2-3/week. Develops local fatigue resistance, capillarization, mitochondrial enzyme activity. Useful for sport-specific muscular endurance demands.', tags: ['programming', 'high-yield'] },
          { q: 'What loading parameters target power?', a: 'Single-effort events (Olympic lifts): 80-90% 1RM, 1-2 reps. Multi-effort events: 75-85% 1RM, 3-5 reps. Ballistic exercises (jumps, throws, dynamic effort): 30-60% 1RM, 3-6 reps. Sets: 3-5. Rest: 2-5 minutes. Maximum intent to move fast is non-negotiable.', tags: ['programming', 'high-yield', 'foundational'] },
          { q: 'Differentiate sets, reps, volume, and intensity.', a: 'Reps: number of repetitions in one set. Sets: number of repetition groups. Volume: total work (sets × reps × load, or just sets × reps depending on metric). Intensity: percentage of 1RM or proximity to failure. Volume-load = sets × reps × weight.', tags: ['programming'] },
          { q: 'What is RPE and RIR?', a: 'RPE (Rating of Perceived Exertion): subjective effort on a scale (Borg 6-20 traditional; modified 1-10 common in lifting). RIR (Reps in Reserve): how many reps remain before failure. Approximate mapping: RPE 10 = 0 RIR, RPE 9 = 1 RIR, RPE 8 = 2 RIR. Allows autoregulation across days when readiness varies.', tags: ['programming', 'high-yield'] },
          { q: 'How is 1RM estimated from submaximal loads?', a: 'Prediction equations such as Epley (1RM = weight × (1 + reps/30)) or Brzycki (1RM = weight × 36/(37-reps)). Most accurate at 1-10 reps; accuracy decreases at higher rep ranges. Better suited to trained athletes; for novices use submaximal RPE-based prescriptions.', tags: ['testing', 'high-yield'] },
          { q: 'What is tempo and how is it prescribed?', a: 'A 4-digit code indicates time (in seconds) for eccentric / pause / concentric / top pause. Example "3-1-1-0" = 3-second descent, 1-second pause at bottom, 1-second ascent, no pause at top. Slow eccentric increases TUT (time under tension) and may aid hypertrophy and rehab; explosive concentric trains power.', tags: ['programming'] },
        ]
      },
      {
        id: 'periodization',
        title: 'Periodization Models',
        cards: [
          { q: 'Define periodization.', a: 'The systematic, planned variation of training variables (volume, intensity, exercise selection, etc.) over time to maximize specific adaptations and peak performance for competition while managing fatigue and avoiding overtraining.', tags: ['periodization', 'high-yield', 'foundational'] },
          { q: 'Define macrocycle, mesocycle, and microcycle.', a: 'Macrocycle: the full annual or quadrennial training plan. Mesocycle: blocks of weeks (typically 3-6) sharing a primary focus (hypertrophy, strength, power, peak). Microcycle: a single week (training "cycle"). Microcycles fit inside mesocycles fit inside macrocycles.', tags: ['periodization', 'high-yield', 'foundational'] },
          { q: 'Describe linear (classic) periodization.', a: 'Sequential progression from high volume / low intensity → low volume / high intensity over a macrocycle. Classic sequence: hypertrophy → basic strength → strength/power → peaking → active recovery. Best for novice and intermediate athletes; less effective for advanced athletes needing more varied stimulus.', tags: ['periodization', 'high-yield'] },
          { q: 'Describe undulating (non-linear) periodization.', a: 'Frequent variation of intensity and volume — daily (DUP) or weekly (WUP). Example: Mon heavy (3×5), Wed light/power (5×3 @ ~50% with intent), Fri hypertrophy (3×10). Better suited to advanced athletes; allows multiple qualities to be trained concurrently.', tags: ['periodization', 'high-yield'] },
          { q: 'Describe block periodization.', a: 'Concentrated focus on a limited number of qualities per block (3-6 weeks), with blocks sequenced to build on each other. Issurin\'s classic model: Accumulation (work capacity/hypertrophy) → Transmutation (sport-specific strength/power) → Realization (peaking, taper). Each block transforms qualities from the previous one.', tags: ['periodization', 'high-yield'] },
          { q: 'Describe the conjugate method (Westside Barbell).', a: 'Multiple qualities trained simultaneously, rotating max-effort and dynamic-effort movements. Max-effort day: work up to 1-3RM on a rotating main lift. Dynamic-effort day: speed work at 50-60% with bands/chains. Repetition day: accessory volume work. Exercise variation rotates frequently to prevent accommodation.', tags: ['periodization'] },
          { q: 'What is a deload?', a: 'A planned reduction in training stress (typically 40-60% volume reduction, intensity maintained or moderately reduced) to allow accumulated fatigue dissipation and supercompensation. Commonly programmed every 4-6 weeks, or autoregulated by performance metrics.', tags: ['periodization'] },
          { q: 'What is a taper?', a: 'Pre-competition reduction in training load to dissipate fatigue while maintaining fitness. Typically 2-3 weeks before competition. Volume reduced 40-60%, intensity maintained, frequency moderately reduced. Performance can improve 1-3% during a well-executed taper.', tags: ['periodization', 'high-yield'] },
          { q: 'What is post-activation potentiation (PAP)?', a: 'Brief enhancement of muscular performance immediately following a heavy or maximal contraction. Mechanism: phosphorylation of myosin regulatory light chains + increased motor neuron excitability. Application: heavy back squat → vertical jump 4-8 minutes later may show enhanced output. Highly individual; advanced athletes respond more.', tags: ['periodization', 'high-yield'] },
        ]
      },
      {
        id: 'olympic-lifts',
        title: 'Olympic Lifts & Power Training',
        cards: [
          { q: 'What are the phases of the snatch and clean?', a: '(1) First pull: bar leaves floor to knees — slow, controlled, set position. (2) Transition (scoop): bar passes knees, hips move under, lifter prepares for second pull. (3) Second pull: explosive triple extension of hips, knees, ankles + shrug. (4) Catch (turnover): pull under the bar into overhead (snatch) or rack (clean) position. (5) Recovery: stand up.', tags: ['olympic-lifts', 'high-yield'] },
          { q: 'What is triple extension?', a: 'Simultaneous explosive extension of the ankle (plantarflexion), knee, and hip joints. The athletic position from which jumping, sprinting, and Olympic lifting all derive their power. The "second pull" of clean/snatch is the most-studied athletic triple extension.', tags: ['olympic-lifts', 'high-yield', 'foundational'] },
          { q: 'Why do Olympic lifts develop power so effectively?', a: 'They require high-velocity force production against a meaningful load (peak power 50-80% 1RM), full-body triple extension, and acceptance of force during the catch. Suchomel et al. (2017): weightlifting movements produce among the highest power outputs of any training exercise. The neural demand is also exceptional.', tags: ['olympic-lifts', 'high-yield'] },
          { q: 'What is the catch position of the power clean?', a: 'Bar racked across the anterior deltoids and clavicles. Elbows high (parallel to floor or higher). Hips and knees in roughly quarter-squat position. Torso upright, shoulders slightly ahead of buttocks. Bar positioned over center of gravity. Feet slightly wider than starting stance.', tags: ['olympic-lifts'] },
          { q: 'When should a coach NOT spot an Olympic lift?', a: 'NEVER spot Olympic lifts (clean, snatch, jerk). The athlete must dump the bar safely if a lift fails. Spotting is impossible with the speed and trajectory of these lifts and creates injury risk for both. Train athletes to safely bail forward or backward.', tags: ['olympic-lifts', 'safety', 'high-yield'] },
          { q: 'What pulling derivatives can replace the full Olympic lifts?', a: 'Clean pulls, snatch pulls (no catch, develops triple extension). Hang variations (eliminate the floor → knee pull). High pulls (continues bar upward without turnover). Jump shrugs (overload triple extension). Mid-thigh pulls (isometric — measures peak force). Useful for athletes who can\'t catch but need the power development.', tags: ['olympic-lifts'] },
          { q: 'What are common technical errors in the power clean?', a: 'Rushed first pull (losing position). Bar away from body during pull. Early arm bend (kills power). Premature hip extension (jumping back instead of up). Soft catch (collapsing wrists/elbows). Knees caving in catch. Lack of hook grip on heavier weights.', tags: ['olympic-lifts'] },
        ]
      },
      {
        id: 'plyo-speed',
        title: 'Plyometrics, Speed & Agility',
        cards: [
          { q: 'What are the prerequisites for intense lower body plyometrics?', a: 'NSCA guideline: ~1.5× bodyweight back squat 1RM for lower-body plyos before drop jumps and other high-intensity work. Goodwin & Jeffreys alternative: 60% of 1RM back squat for 5 reps in 5 seconds. Lower-intensity hops, skips, and bounds appropriate at lower strength levels.', tags: ['plyometrics', 'high-yield', 'foundational'] },
          { q: 'How is plyometric volume measured?', a: 'Foot contacts per session. NSCA progression: beginner 60-100, intermediate 100-150, advanced 120-200, intense (depth jumps etc) 120-150. Volume decreases as intensity increases. 48-72 hour recovery between intense plyometric sessions for the same body part.', tags: ['plyometrics', 'high-yield'] },
          { q: 'What is the difference between a drop jump and a depth jump?', a: 'Drop jump: step off a box, land softly, focus on absorption mechanics. Depth jump: step off box, land, IMMEDIATELY explode into a maximal vertical (or horizontal) jump. Depth jumps train fast SSC and reactive strength; require strength base. Box height matters — too high decreases output.', tags: ['plyometrics', 'high-yield'] },
          { q: 'Distinguish speed, agility, and change-of-direction.', a: 'Speed: maximum linear velocity. Agility: reactive deceleration, change of direction, and reacceleration in response to a stimulus (open-skill). Change of direction (COD): pre-planned cutting/redirection (closed-skill). Agility = COD + perception/decision-making.', tags: ['speed', 'high-yield'] },
          { q: 'What are the phases of a sprint?', a: '(1) Start/block clearance. (2) Acceleration phase (0-30m, body forward ~45° initially, longer ground contacts, increasing stride length). (3) Maximum velocity phase (30-60m, upright posture, brief ground contacts ~80-100ms, high knee drive). (4) Speed maintenance/deceleration (60m+, slight velocity drop).', tags: ['speed', 'high-yield'] },
          { q: 'What are the biomechanical differences between acceleration and max velocity sprinting?', a: 'Acceleration: ~45° forward lean (controlled "falling"), longer ground contacts (~150-200ms), longer than ideal stride length increases over time, knees driving forward. Max velocity: upright torso, brief ground contacts (~80-100ms), high knee lift, "punching down" foot strike under hips, "stepping over" opposite knee.', tags: ['speed'] },
          { q: 'What are the key components of agility training?', a: '(1) Strength and reactive strength base (deceleration capacity). (2) Linear speed (faster reacceleration). (3) Movement-specific technical skill (footwork patterns). (4) Perceptual-cognitive training (reactive drills, open skills, decision-making). Pre-planned COD work alone doesn\'t fully develop sport agility.', tags: ['speed'] },
          { q: 'What is the role of eccentric strength in change of direction?', a: 'Deceleration is fundamentally eccentric. To redirect, an athlete must rapidly absorb force. Eccentric strength (often 1.3-1.8× concentric) and rate of eccentric force production largely determine how sharply an athlete can cut, plant, and redirect. Eccentric-focused training (slow lowering, accentuated eccentric, accommodating resistance) develops this.', tags: ['speed', 'high-yield'] },
        ]
      },
      {
        id: 'session-design',
        title: 'Exercise Order & Session Structure',
        cards: [
          { q: 'What is the standard order of exercises in a training session?', a: '(1) Movement preparation / dynamic warm-up. (2) Power/explosive lifts (Olympic, jumps, throws). (3) Compound primary strength lifts (squat, deadlift, bench, press, row). (4) Assistance exercises. (5) Isolation/accessories. (6) Conditioning if applicable. Highest neural demand first; lowest last.', tags: ['programming', 'high-yield', 'foundational'] },
          { q: 'Why are power exercises trained before strength in a session?', a: 'Power and Olympic lift execution requires maximum neural output and quality of movement. Performing them fresh ensures highest velocities (the training goal), best technique, and lowest injury risk. Strength work has higher neural cost but more tolerance to pre-fatigue.', tags: ['programming', 'high-yield'] },
          { q: 'Why is a dynamic warm-up preferred over static stretching pre-training?', a: 'Dynamic warm-ups raise core temperature, activate the nervous system, increase joint range of motion functionally, and prepare movement patterns. Static stretching held >30s pre-training has been shown to acutely reduce force production for 30-60+ minutes (likely mechanoreceptor desensitization and altered stiffness).', tags: ['programming', 'high-yield'] },
          { q: 'When is static stretching appropriate?', a: 'Post-training, during dedicated mobility sessions, or hours before competition (not immediately before). For chronic flexibility improvements, 30+ seconds per stretch, multiple sets. Effective for improving ROM without performance compromise when separated from competition.', tags: ['programming'] },
          { q: 'How do you structure a complex training session?', a: 'Pair a heavy strength exercise with a biomechanically similar plyometric/power exercise to harness PAP. Example: heavy back squat 3-5 reps, rest 4-8 minutes, then 5 max vertical jumps. The strength exercise potentiates the power expression. Use with advanced athletes only; not for beginners.', tags: ['programming'] },
          { q: 'How should weekly training frequency be set for a given muscle/movement?', a: 'Generally 2-3 sessions per movement pattern per week for trained athletes. Higher frequency allows volume distribution and more frequent MPS stimulation. Lower frequency (1x/week) is suboptimal for hypertrophy when volume is matched, though acceptable for strength maintenance.', tags: ['programming'] },
        ]
      },
    ]
  },
  phase5: {
    id: 'phase5',
    title: 'Phase V — Testing & Application',
    subtitle: 'Assessment, special populations & professional practice',
    color: '#5E60CE',
    icon: 'BarChart3',
    description: 'Chapters 12, 13, 14, and selected later chapters. Assessment battery design and real-world application.',
    domains: [
      {
        id: 'testing-principles',
        title: 'Testing Principles',
        cards: [
          { q: 'Define reliability and validity in testing.', a: 'Reliability: consistency of results when the test is repeated under identical conditions. Validity: the degree to which the test measures what it claims to measure. A test can be reliable (consistent) without being valid for the purpose. Both required for useful assessment.', tags: ['testing', 'high-yield'] },
          { q: 'What is the proper order of tests in a battery?', a: '(1) Non-fatiguing: anthropometrics (height, weight, body comp), flexibility. (2) Agility tests (pro agility, T-test). (3) Maximum power/strength (vertical jump, 1RMs). (4) Sprint tests. (5) Local muscular endurance. (6) Anaerobic capacity (300-yd shuttle). (7) Aerobic capacity (1.5-mile, Yo-Yo). Fatiguing tests last; ideally separate day.', tags: ['testing', 'high-yield', 'foundational'] },
          { q: 'When is 1RM testing appropriate?', a: 'For trained athletes (typically 1+ year of consistent resistance training) with sound technique. NOT appropriate for: novices, youth athletes pre-PHV, those returning from injury, or those with health contraindications. Use submaximal estimates (3-10RM and prediction equations) for these populations.', tags: ['testing', 'high-yield'] },
          { q: 'What pre-test conditions affect reliability?', a: 'Standardize: time of day, prior nutrition, hydration, sleep, warm-up protocol, equipment, surface, environmental conditions (temperature/humidity), tester, technique cues. Athletes should not test if fatigued, glycogen-depleted, dehydrated, or recently fed. Document all conditions for retesting comparison.', tags: ['testing'] },
          { q: 'Differentiate field tests and laboratory tests.', a: 'Lab tests: high precision, controlled environment, expensive equipment (force plate, gas analyzer, isokinetic dynamometer). Field tests: practical, sport-specific, inexpensive, lower precision (40-yard dash, vertical jump with chalk, 1.5-mile run). Most S&C testing is field-based by necessity and design.', tags: ['testing'] },
        ]
      },
      {
        id: 'specific-tests',
        title: 'Common Performance Tests',
        cards: [
          { q: 'What does the vertical jump test measure?', a: 'Lower body explosive power. Countermovement jump (CMJ) measures power with stretch-shortening contribution. Squat jump (SJ) measures concentric-only power. Difference (CMJ-SJ) indicates SSC effectiveness. Sayers equation estimates peak power from jump height + body mass. Reliable and highly correlated with sprint performance.', tags: ['testing', 'high-yield'] },
          { q: 'What does the 40-yard dash measure?', a: 'Primarily acceleration (split times). 10-yard split = pure acceleration. 20-yard = transitional. 40-yard = mix of acceleration and approaching max velocity. Most football combine times are decided in the first 10 yards. Standard test for football, baseball, lacrosse.', tags: ['testing', 'high-yield'] },
          { q: 'Describe the pro agility (5-10-5) test.', a: 'Athlete starts in 3-point stance straddling a line. Sprint 5 yards to one cone, touch, sprint 10 yards to opposite cone, touch, sprint 5 yards back through start. Measures change-of-direction ability. Total time typically 4.0-5.0 seconds for athletes.', tags: ['testing', 'high-yield'] },
          { q: 'Describe the T-test.', a: 'Multi-directional agility test. 4 cones in T-shape (10 yds forward to middle cone; 5 yds left and right to side cones). Athlete sprints forward, shuffles right, shuffles left across, shuffles right back to middle, backpedals to start. Total distance: 40 yards. Measures forward acceleration, lateral shuffle, backpedal — common in basketball.', tags: ['testing'] },
          { q: 'What does the Yo-Yo Intermittent Recovery Test assess?', a: 'Sport-specific aerobic capacity with repeated high-intensity bouts: 2 × 20m shuttle runs at progressively increasing speeds, with 10-second active recovery between bouts. Yo-Yo IRT1 starts at 10 km/h; IRT2 starts at 13 km/h. Highly relevant for team sports (soccer, basketball, rugby).', tags: ['testing', 'high-yield'] },
          { q: 'When is the 1.5-mile run test appropriate?', a: 'Field test of aerobic capacity. Predicts VO2max via equations. Appropriate for trained populations with running experience. Should be performed before strength/power testing (very fatiguing). Better for endurance-sport athletes; not ideal for explosive sport athletes.', tags: ['testing'] },
          { q: 'What is the 300-yard shuttle test?', a: 'Anaerobic capacity test. 6 × 25-yard shuttles (turning each direction) for total of 300 yards. Heavily fatiguing — must be done at end of testing or on separate day. Measures glycolytic capacity, important for sports with sustained high-intensity efforts (wrestling, MMA, midfielders).', tags: ['testing'] },
          { q: 'How are tests sequenced when multiple are done on the same day?', a: 'Group from least to most fatiguing within categories. Strength tests don\'t affect speed/power; both should come before muscular endurance. Anaerobic capacity (300-yd shuttle) and aerobic capacity (1.5-mile, Yo-Yo) should ideally be a separate testing day. If combined, fatiguing tests last.', tags: ['testing', 'high-yield'] },
        ]
      },
      {
        id: 'special-pops',
        title: 'Youth, Female & Special Populations',
        cards: [
          { q: 'At what age can resistance training begin?', a: 'NSCA & ACSM position: children as young as 7-8 can safely engage in supervised resistance training when developmentally ready (can follow instructions, accept coaching, demonstrate emotional maturity). Focus on technique, bodyweight, light external loads. Strength gains in youth are largely neural before PHV.', tags: ['special-pops', 'high-yield', 'foundational'] },
          { q: 'What is peak height velocity (PHV)?', a: 'The point of fastest growth during the adolescent growth spurt. Girls: ~12 years (range 10-14). Boys: ~14 years (range 12-16). Strength and power gains accelerate post-PHV due to hormonal maturation (especially testosterone in males). Coaches should track maturational status, not just chronological age.', tags: ['special-pops', 'high-yield'] },
          { q: 'How does training need to be adjusted for female athletes?', a: 'Programming principles are largely identical; absolute loads differ. Special considerations: (1) ACL injury risk 4-8× higher than males — train deceleration, landing mechanics, hamstring strength. (2) Menstrual cycle may influence performance/recovery (highly individual). (3) Higher relative ROM but generally lower absolute strength. (4) Screen for RED-S — particularly in lean-aesthetic and endurance sports.', tags: ['special-pops', 'high-yield'] },
          { q: 'Why is ACL injury risk higher in female athletes?', a: 'Multifactorial: anatomical (wider Q-angle, narrower intercondylar notch), hormonal (estrogen affects ligament laxity, varies across cycle), neuromuscular (quad-dominant landing patterns, less hamstring activation, knee valgus on landing). Targeted neuromuscular training programs (FIFA 11+, PEP) reduce ACL injury risk by 50-70%.', tags: ['special-pops', 'high-yield'] },
          { q: 'How does resistance training affect older adults?', a: 'Substantially mitigates sarcopenia (age-related muscle loss ~3-5% per decade after 30), improves bone density (reduces osteoporosis risk), reduces falls, improves functional capacity, improves insulin sensitivity, reduces all-cause mortality. Adaptations occur at any age. Progress carefully but train hard — older adults often underdose intensity.', tags: ['special-pops', 'high-yield'] },
          { q: 'What modifications are needed for pregnant athletes?', a: 'ACOG: continue resistance training during uncomplicated pregnancy. Avoid: supine positioning after first trimester (vena cava compression), high-fall-risk movements, Valsalva/maximal lifts, contact sports, hot environments. Modify: load, ROM, exercise selection. Maintain training; not the time to chase PRs.', tags: ['special-pops'] },
          { q: 'How is asthma managed in athletes?', a: 'Exercise-induced bronchoconstriction (EIB) common. Pre-exercise short-acting bronchodilator (typically albuterol). Adequate warm-up reduces severity. Manage environmental triggers (cold air, allergens, pollution). With proper management, asthmatic athletes compete at all levels.', tags: ['special-pops'] },
          { q: 'What is the role of resistance training in cardiac populations?', a: 'No longer contraindicated. Cardiac patients benefit from resistance training (improved muscle quality, glucose control, functional capacity). Avoid Valsalva and very heavy loads. Begin under supervision, monitor BP. Typically 40-60% 1RM, 10-15 reps, focus on technique and breathing.', tags: ['special-pops'] },
        ]
      },
      {
        id: 'professional-practice',
        title: 'Professional Practice & Safety',
        cards: [
          { q: 'What is the spotter\'s role?', a: 'Ensure safe lift completion. Communicate with lifter (signal start, count reps, agree on bail conditions). Maintain proper position (close enough to assist, not so close as to interfere). Be strong enough to assist or safely guide weight to safety. Never let go if lifter requires assist.', tags: ['safety'] },
          { q: 'When are spotters required and contraindicated?', a: 'REQUIRED: overhead lifts (military press, overhead squat), lifts with bar over face/neck (bench press, lying tricep extension), near-max attempts. CONTRAINDICATED: Olympic lifts (clean, snatch, jerk) — dump the bar instead. Squats: a spotter is helpful but power racks with safeties are safer than human spotters at max loads.', tags: ['safety', 'high-yield'] },
          { q: 'What are key strength and conditioning facility safety standards?', a: '3 ft minimum between platforms/stations. Impact-absorbing flooring. Bolted-down equipment where applicable. Regular inspection of cables, bands, bars, plates. Clear emergency exits. AED and first-aid kit accessible and current. Posted EAP (Emergency Action Plan). Coaches CPR/AED certified. Adequate supervision (NSCA recommends 1:10-1:15 coach:athlete ratio for novice/intermediate, lower for advanced).', tags: ['safety', 'high-yield'] },
          { q: 'What is the scope of practice for an S&C coach?', a: 'Designing and implementing physical preparation programs to improve athletic performance and reduce injury risk. NOT within scope: medical diagnosis, injury rehabilitation (this is athletic training / physical therapy), nutrition prescription (RD or sports dietitian), psychological counseling. Refer when outside scope.', tags: ['professional', 'high-yield'] },
          { q: 'What is an Emergency Action Plan (EAP)?', a: 'Written, site-specific plan detailing response to medical emergencies. Includes: chain of command, emergency contact protocols, AED location, first responder roles, transportation routes, communication plan. Required by NSCA standards. All staff must know it. Practice/review at least annually.', tags: ['safety'] },
          { q: 'What are common contraindications to maximal resistance training?', a: 'Uncontrolled hypertension (>160/100), unstable cardiac conditions, recent surgery, acute injury, severe osteoporosis (with high-impact loading), uncontrolled diabetes, certain detachment-risk conditions. Always require physician clearance for clients with significant medical history.', tags: ['safety'] },
          { q: 'How are training records and athlete monitoring conducted?', a: 'Track: training loads, RPE, sleep, soreness, mood, performance metrics. Tools: wellness questionnaires (Hooper Index, profile of mood states), session RPE, HRV, jump performance, sprint times. Look for trends, not single data points. Aggregate data to inform program adjustments.', tags: ['professional'] },
        ]
      },
    ]
  },
  phase6: {
    id: 'phase6',
    title: 'Phase VI — NASM Sports Performance',
    subtitle: 'Biomotor abilities, injury & RTP, youth development',
    color: '#9D4EDD',
    icon: 'Sparkles',
    description: 'NASM Sports Performance content. Bridges programming, periodization, injury management, and long-term athlete development from the Sports Performance Coach perspective.',
    domains: [
      {
        id: 'biomotor',
        title: 'Biomotor Abilities & Strength Methods',
        cards: [
          { q: 'What are biomotor abilities?', a: 'Fundamental elements of skill-related fitness that create a foundation for sport skill acquisition. The major biomotor abilities are strength, power, speed, endurance, agility, balance, coordination, and flexibility. Developing them properly extends an athlete\'s skill ceiling.', tags: ['nasm', 'biomotor', 'foundational'] },
          { q: 'Name the three traditional strength development methods (NASM).', a: 'Repeated effort: nonmaximal load lifted to failure (hypertrophy/strength endurance). Maximal effort: maximal load or maximal resistance (absolute strength). Dynamic effort: nonmaximal load moved at maximal speed (explosive strength/power).', tags: ['nasm', 'high-yield'] },
          { q: 'Define rate of force development per NASM.', a: 'The development of maximal force in minimal time. Used as an index of explosive strength. Two athletes lifting the same 405 lb deadlift — one finishing in 1.5 sec, the other in 2.25 sec — illustrate RFD\'s practical relevance: the faster athlete carries more force-production capacity into sport actions.', tags: ['nasm', 'rfd', 'high-yield'] },
          { q: 'What loads correspond to the three strength methods (NASM)?', a: 'Repeated effort: 5-85% 1RM. Maximal effort: 75-88% (submaximal) or ≥90% 1RM (true max). Dynamic effort: 30-55% for deadlift/squat/press with accommodating resistance, 40-70% with barbell load, 70-76% 1RM for Olympic lifts (snatch, clean & jerk).', tags: ['nasm', 'high-yield'] },
          { q: 'What is modified repeated effort?', a: 'A taxing repetition range, but stopping with 1-2 reps in reserve rather than going to failure. Allows quality across more total volume with lower fatigue cost than true repeated-effort training to failure.', tags: ['nasm'] },
          { q: 'How does manipulating repetition tempo apply to strength development?', a: 'Adjusting eccentric, concentric, and amortization phases changes time under tension. Slower eccentrics with a brief pause and slightly faster concentric (e.g., 3-1-1 tempo at 70% 1RM × 12 reps) maximize hypertrophy stimulus for muscle groups that need development.', tags: ['nasm'] },
        ]
      },
      {
        id: 'speed-power-endurance',
        title: 'Speed, Power & Endurance Components',
        cards: [
          { q: 'Distinguish linear speed, lateral speed, and acceleration (NASM).', a: 'Linear speed: forward-backward orientation. Lateral speed: side-to-side movement. Acceleration: the rate of change of speed — the dominant quality in short sprints. Top speed becomes relevant in longer sprints (>50-60m).', tags: ['nasm', 'speed', 'high-yield'] },
          { q: 'At what distance do track sprinters reach top speed?', a: 'After 50 to 60 meters (Brown & Vescovi, 2012). Team sports rarely exceed 20-30m per sprint, but eliminating top-speed work entirely is a mistake — top speed and acceleration are complementary and both should be addressed in the context of the sport.', tags: ['nasm', 'speed'] },
          { q: 'How does NASM define power in performance terms?', a: 'The ability to produce as much force as possible over the distance required for a skill in the least amount of time possible. Holds true for endurance, power, and team-sport athletes — all categories test significantly higher on power metrics than non-athletes.', tags: ['nasm', 'power', 'high-yield'] },
          { q: 'What relationship do faster sprinters share with ground contact time?', a: 'Faster sprinters have shorter ground contact times. Reduced ground contact correlates with maximal sprint speed (Nummela et al., 2007). Higher forces produced in less time = more powerful athlete (the power equation in action).', tags: ['nasm', 'speed', 'high-yield'] },
          { q: 'What does shifting the force-velocity curve "up and to the right" mean?', a: 'The training goal: produce more force at any given velocity. Research shows elite sprinters differ from nonspecialists more on the velocity end than the force end — implicating RFD as a key sprint performance indicator (Morin et al., 2012).', tags: ['nasm', 'force-velocity', 'high-yield'] },
          { q: 'What are the three categories of endurance per NASM?', a: 'Anaerobic endurance (ATP replenishment without oxygen — high-intensity continuous efforts like 400m sprint, 100m swim). Aerobic endurance (steady-state and recovery between bouts). Muscular endurance (submaximal repeated muscle contraction resistance to fatigue).', tags: ['nasm', 'endurance', 'high-yield'] },
          { q: 'Define repeated sprint ability.', a: 'Sprints lasting less than 10 seconds followed by incomplete recovery of less than 60 seconds. Common in team sports. Better maintenance of speed across repeated sprints = higher anaerobic endurance. Aerobic system contribution grows as sprint count increases.', tags: ['nasm', 'endurance', 'high-yield'] },
          { q: 'How does aerobic endurance support intermittent sport performance?', a: 'Aerobic fitness is critical during recovery between sprint bouts. Gantois et al. (2017) found increasingly strong VO₂max-to-sprint-speed associations across 6 × 30m sprints with 20s recovery. Aerobic fitness is "a precious asset" for sustained performance in intermittent sports.', tags: ['nasm', 'endurance'] },
          { q: 'Why does maximal strength benefit muscular endurance?', a: 'Improving maximal strength reduces the relative load of submaximal sport-specific actions, staving off fatigue. Semi-professional rugby players with high 4RM squat strength demonstrated better tackling ability under fatigue (Gabbett, 2016). Muscular endurance is a submaximal expression of strength.', tags: ['nasm', 'endurance', 'high-yield'] },
        ]
      },
      {
        id: 'nasm-periodization',
        title: 'Periodization Phases & Cycle Planning',
        cards: [
          { q: 'What are the three phases of the annual plan (NASM)?', a: '(1) Preparatory phase (preseason/off-season) — foundational biomotor development. (2) Competitive phase (in-season) — peak performance with reduced volume, increased intensity. (3) Transition phase (post-season) — active rest, physical and psychological recovery.', tags: ['nasm', 'periodization', 'high-yield', 'foundational'] },
          { q: 'Distinguish general preparatory from specific preparatory phase.', a: 'General preparatory: early weeks emphasizing aerobic conditioning (steady-state or aerobic intervals >3 min) and higher-volume resistance training (3-6 sets × 6-12 reps, lighter loads, more accessory work). Specific preparatory: shifts to sport-specific anaerobic capacity (repeated sprints, 30s intervals with 2-4 min recovery) and maximum strength focus (>85% 1RM).', tags: ['nasm', 'periodization', 'high-yield'] },
          { q: 'Describe the competitive phase.', a: 'In-season period when peak performance is planned. Decreases in training volume, increases in training intensity. Practice time increases for skill and strategy. Long competitive seasons require manipulation of intensity, duration, and volume to preserve performance and prevent overtraining.', tags: ['nasm', 'periodization', 'high-yield'] },
          { q: 'What is the transition phase?', a: 'Off-season active rest period. No formal competition. General physical conditioning maintained but recovery prioritized. Can last 1+ weeks. Longer transition phases are ideal for injury rehabilitation. Two transition periods may be used: between preparatory and competitive, and between competitive seasons.', tags: ['nasm', 'periodization'] },
          { q: 'What is the 3:1 loading strategy?', a: 'Three weeks of accumulated training stress followed by one week of reduced stress (deload). The reduction is accomplished by reducing volume while maintaining intensity that matches the training phase goals. Critical for advanced athletes who need higher-volume loads for adaptation.', tags: ['nasm', 'periodization', 'high-yield'] },
          { q: 'Distinguish mono-cycle, bi-cycle, and tri-cycle plans.', a: 'Mono-cycle: one peak per year, long preparatory phase (seasonal sports like football, soccer, baseball). Bi-cycle: two peaks per year (advanced athletes, sports with two competitive seasons). Tri-cycle: three peaks per year (elite athletes only — Olympic-style sports like boxing, wrestling, gymnastics with national, qualifier, and international championships in same year).', tags: ['nasm', 'periodization', 'high-yield'] },
          { q: 'Define micro-, meso-, and macro-cycle per NASM.', a: 'Micro-cycle: a single training week (sometimes 7-14 days). Mesocycle: monthly or multi-month plan linking micro-cycles, typically one phase of training. Macro-cycle: a complete season including training and competition components, often the full calendar year.', tags: ['nasm', 'periodization', 'high-yield', 'foundational'] },
          { q: 'What are the four types of micro-cycles?', a: 'Active rest micro-cycle (initial preparatory weeks or transitions). Base micro-cycle (first week of a new phase, lower intensity / higher volume, develops stabilization and muscular endurance). Load micro-cycle (step-loaded increase in intensity, volume manipulated). Deload micro-cycle (reduction in both intensity and volume, similar to tapering).', tags: ['nasm', 'periodization', 'high-yield'] },
          { q: 'What is a standard mesocycle structure?', a: 'Three progressive micro-cycles (one base, two load) plus one deload micro-cycle. Training intensity often increases by ~5% per week in a step-loaded pattern. Deload reduces intensity by about 5%, returning to base-week levels.', tags: ['nasm', 'periodization'] },
          { q: 'How long can complete rest be implemented before detraining?', a: '5 to 7 days of rest will not affect fitness levels. After 7 days, the athlete may begin to detrain and progress may diminish. Useful during exam periods or holidays. Light walking is still recommended even during complete rest.', tags: ['nasm', 'recovery'] },
        ]
      },
      {
        id: 'periodization-models',
        title: 'Periodization Models (NASM)',
        cards: [
          { q: 'Describe linear periodization (NASM).', a: 'Initial high-volume, low-intensity training that progressively decreases in volume and increases in intensity over months. Phases traditionally last at least 4 weeks; full progression may require 6 months. Best fit: athletes with short competition seasons or few competitions per year.', tags: ['nasm', 'periodization', 'high-yield'] },
          { q: 'Describe block periodization (NASM).', a: 'Focused training on one adaptation per block (one month / mesocycle) before changing acute variables. Three sequential parts: Accumulation (general preparation — corrective, hypertrophy, strength endurance). Transmutation (sport-specific training). Realization (taper and competition). Issurin developed this model for elite athletes.', tags: ['nasm', 'periodization', 'high-yield'] },
          { q: 'Describe daily undulating periodization (DUP).', a: 'Frequent changes in volume and intensity within a week. Each training session of the week emphasizes a specific trait. Fits well with microdosing — shorter, more frequent sessions throughout the week (especially in-season). Reduces neural fatigue compared to prolonged linear progressions.', tags: ['nasm', 'periodization', 'high-yield'] },
          { q: 'What is microdosing in training?', a: 'Spreading shorter, more frequent training sessions throughout the week to accommodate in-season requirements. Allows continued development of biomotor abilities without excessive fatigue. Coaches often program 1-2 sessions per week in-season using this approach.', tags: ['nasm', 'periodization'] },
          { q: 'Describe conjugate periodization (NASM).', a: 'Advanced model for athletes with strong training foundation and high training age. Uses concentrated loading blocks (2-8 weeks) to intentionally overreach and accumulate fatigue, followed by restitution blocks with reduced volume and shifted priorities. Pushes the upper limits of training tolerance.', tags: ['nasm', 'periodization', 'high-yield'] },
          { q: 'Why is conjugate periodization inappropriate for beginners?', a: 'It uses concentrated loading to intentionally overreach and promote fatigue — a stimulus novice athletes cannot tolerate. Their physiological systems and recovery capacity haven\'t developed enough to handle the planned fatigue accumulation and benefit from the delayed training effect.', tags: ['nasm', 'periodization'] },
          { q: 'What is the delayed training effect?', a: 'After a fatiguing accumulation block, performance temporarily drops, but the adaptations from that block are expressed later in the subsequent restitution phase when recovery is optimized. Central to conjugate sequencing — the gains "show up" after recovery, not during the heavy training.', tags: ['nasm', 'periodization'] },
          { q: 'What is selective periodization?', a: 'Tailoring the periodization model and annual plan to the individual athlete\'s performance schedule and experience level. Recognizes that most periodization research is on elite athletes, and models may be unsuitable for younger or less experienced athletes. Match model complexity to athlete experience.', tags: ['nasm', 'periodization'] },
        ]
      },
      {
        id: 'tissue-healing',
        title: 'Tissue Response & Healing',
        cards: [
          { q: 'What are the three stages of healing?', a: '(1) Inflammation — onset of injury, lasts hours to days. Pain, swelling, limited function; brief immobilization (3-7 days) may help. (2) Proliferation — 2-4 weeks (longer for bone). Macrophages remove dead tissue, fibroblasts produce scar tissue. (3) Remodeling — through ~12 weeks. Tissue matures and aligns along stress lines.', tags: ['nasm', 'injury', 'high-yield', 'foundational'] },
          { q: 'Why is appropriate exercise technique critical during remodeling?', a: 'During the remodeling stage (up to ~12 weeks), tissue responds to stress and the cross-hatched collagen fiber matrix realigns along lines of stress. Compensatory or faulty movement patterns will cause abnormal tissue alignment and impaired recovery. Never train through obvious movement compensations.', tags: ['nasm', 'injury'] },
          { q: 'What is Wolff\'s law?', a: 'Bone tissue adapts to the loads placed upon it — stress is the primary stimulus for bony adaptation. Explains why progressive loading increases bone density and why immobilization decreases it. Foundational to all loading progressions.', tags: ['nasm', 'injury', 'high-yield'] },
          { q: 'What is Davis\'s law?', a: 'Soft tissues (muscle and connective tissue) remodel along the lines of stress placed upon them. Complements Wolff\'s law for soft tissue. Guides eccentric and multi-planar rehab loading to ensure tissue heals with appropriate orientation for sport demands.', tags: ['nasm', 'injury', 'high-yield'] },
          { q: 'How are muscle strain grades classified?', a: 'Grade I: mild — minimal fiber disruption, small loss of strength. Grade II: moderate tear — partial fiber disruption, palpable defect, significant strength loss. Grade III: severe — complete rupture of muscle or musculotendinous junction. Recovery times scale with grade.', tags: ['nasm', 'injury'] },
          { q: 'How are ligament sprain grades classified?', a: 'Grade I: mild tear — minimal laxity, minor pain. Grade II: moderate tear — partial tear, moderate laxity. Grade III: complete tear or rupture — gross instability, may require surgical reconstruction. Healing is complicated by accessory damage and joint demands.', tags: ['nasm', 'injury', 'high-yield'] },
          { q: 'Why does cartilage heal slowly?', a: 'Cartilage is avascular (no blood supply). It receives nutrition through gentle compression/decompression of joint spaces rather than direct circulation. It is also aneural — pain often doesn\'t manifest until significant degradation has impaired surrounding tissues. Chronic damage leads to osteoarthritis.', tags: ['nasm', 'injury', 'high-yield'] },
          { q: 'List the four primary sensory receptors involved in movement.', a: 'Muscle spindles (within muscles, parallel to fibers — detect stretch). Golgi tendon organs / GTO (at musculotendinous junction — detect tension). Ruffini endings (within joint spaces — detect joint position). Pacinian corpuscles (within joint spaces — detect pressure changes and rapid movement).', tags: ['nasm', 'neural', 'high-yield'] },
          { q: 'What is exertional rhabdomyolysis?', a: 'Extreme fatigue causes rapid muscle tissue breakdown, releasing myoglobin into the blood. ATP demand exceeds supply, leading to muscle cell death. Symptoms: dark reddish urine, severe muscle aches/stiffness, weakness. 33-50% develop acute kidney failure; up to 8% fatal. Requires immediate medical care and phased RTP.', tags: ['nasm', 'safety', 'high-yield'] },
          { q: 'Distinguish traumatic and nontraumatic catastrophic injuries.', a: 'Traumatic: caused directly by sport activity (e.g., spinal cord injury from a tackle). Nontraumatic: results from exertion during play or preparation (e.g., sudden cardiac arrest, exertional heat illness, rhabdomyolysis). Since 1970, nontraumatic fatalities have outnumbered traumatic in HS/college football — most occurring in off-season/preseason conditioning.', tags: ['nasm', 'safety', 'high-yield'] },
          { q: 'What is the U-shaped relationship between physical fitness and injury risk?', a: 'Low fitness increases injury risk. Regular training reduces injury risk. But very high training loads increase injury risk again. The curve shows training is protective up to a point, then becomes a risk factor — making load management essential.', tags: ['nasm', 'injury'] },
        ]
      },
      {
        id: 'rehab-rtp',
        title: 'Rehabilitation & Return to Play',
        cards: [
          { q: 'Name the four stages of therapeutic rehabilitation (4-R System).', a: 'Restore (offload, protect, restore pain-free ROM). Reeducate (neuromuscular firing patterns via single-joint, controlled movements). Recondition (coordinate muscle groups, progressive resistance, neuromuscular training continuum). Return to Play (sport-specific, return to baseline or better performance with injury-prevention mindset).', tags: ['nasm', 'rehab', 'high-yield', 'foundational'] },
          { q: 'What is the Sports Performance Coach\'s role in early rehab?', a: 'Coaches should NOT take the lead in early phases — that\'s the licensed medical/allied health team (athletic trainers, PTs, physicians). Coaches CAN: maintain conditioning of uninjured areas, contribute to the restore phase with single-limb training of nontraumatized muscles, and take a larger role in recondition/RTP stages.', tags: ['nasm', 'rehab', 'professional', 'high-yield'] },
          { q: 'Why is isolateral (single-limb) training valuable during early rehab?', a: 'Facilitates neural adaptations that minimize atrophy in the injured area (cross-education effect — training one limb produces strength gains in the contralateral limb). Maintains strength in nontraumatized regions while protecting the injured site.', tags: ['nasm', 'rehab', 'high-yield'] },
          { q: 'Describe the StARRT framework.', a: 'Strategic Assessment of Risk and Risk Tolerance — a model for RTP decision-making. (1) Assessment of health risk (tissue tolerance). (2) Assessment of participation risk (sport demands). (3) Decision modifiers based on risk tolerance. Athletes can return when risk assessment falls below risk tolerance.', tags: ['nasm', 'rtp', 'high-yield'] },
          { q: 'List the standard RTP best-practice criteria.', a: 'Strength at/near pre-injury or symmetrical with uninvolved side. ROM pain-free and symmetrical. No joint instability. No injury site pain. No tissue inflammation or joint effusion. Symmetrical anthropometric measures. Functional performance at/near pre-injury levels.', tags: ['nasm', 'rtp', 'high-yield'] },
          { q: 'Distinguish "return to play" and "return to participation".', a: 'Return to play: athlete resumes their sport at a level similar to pre-injury, often competitive context (sport-specific). Return to participation: broader — includes sport, work, recreation, and daily life activities. RTP is a subset of RTPart.', tags: ['nasm', 'rtp'] },
          { q: 'What is the joint-by-joint approach (Cook) for movement quality?', a: 'Alternating pattern of stability and mobility from foot to head: Foot (stable), Ankle (mobile), Knee (stable), Hip (mobile), Lumbar spine (stable), Thoracic spine (mobile), Scapulothoracic (stable), Glenohumeral (mobile). Injury alters this pattern, increasing risk; restoring it is key to RTP.', tags: ['nasm', 'rehab', 'high-yield'] },
          { q: 'How does ankle injury propagate up the kinetic chain?', a: 'Restricted ankle mobility forces the foot to demonstrate excessive mobility (instead of stability), increasing frontal/transverse plane motion. This creates abnormal loading patterns that can affect the knee (PFP), hip (Trendelenburg pattern), and lumbar spine. Foot-to-hip relationship is essential in rehab.', tags: ['nasm', 'rehab'] },
          { q: 'Why is eccentric strength prioritized in injury resilience training?', a: 'Loss of eccentric strength and neuromuscular control during detraining is a major injury risk factor — a primary mechanism of injury is the inability to decelerate multiple joint segments during rotational movements. Progressive multiplanar eccentric strength training restores deceleration capacity.', tags: ['nasm', 'rehab', 'high-yield'] },
          { q: 'How does muscular detraining affect mitochondrial function?', a: 'Mitochondrial enzyme activity and oxygen transport capacity decrease ~30% in the first 3 weeks of detraining and up to ~40% by 6 weeks (Coyle, 1990; Mujika & Padilla, 2001). Combined with fiber shifts and CSA reduction, this creates a significant injury risk.', tags: ['nasm', 'recovery', 'high-yield'] },
        ]
      },
      {
        id: 'corrective-load-mgmt',
        title: 'Corrective Exercise & Load Management',
        cards: [
          { q: 'Describe the four steps of the NASM Corrective Exercise Continuum.', a: '(1) Inhibit — reduce activity of overactive tissue (SMR/foam rolling). (2) Lengthen — restore optimal length to shortened tissue (static stretching). (3) Activate — re-engage underactive muscles (isolated strengthening). (4) Integrate — coordinate the corrected pattern into multi-joint, integrated movement.', tags: ['nasm', 'rehab', 'high-yield', 'foundational'] },
          { q: 'Provide an example of the CEx Continuum for knee valgus.', a: 'Short/overactive: adductors. Long/underactive: gluteal complex (gluteus medius). Step 1 (Inhibit): SMR adductors 1×30s. Step 2 (Lengthen): static stretch adductors 1×30s. Step 3 (Activate): side-lying hip abduction 1×12 reps. Step 4 (Integrate): single-leg balance reach 1×12 reps.', tags: ['nasm', 'rehab', 'high-yield'] },
          { q: 'Distinguish external from internal training load.', a: 'External load: the athlete\'s observable performance efforts (repetitions, weight, distance, time, throws, peak velocity). Internal load: the biomechanical, physiological, and psychological responses to that external load. External is easy to document; internal requires monitoring tools like sRPE.', tags: ['nasm', 'monitoring', 'high-yield'] },
          { q: 'How is session RPE (sRPE) calculated and used?', a: 'sRPE = perceived effort (1-10 scale) × session duration (minutes). Tracks internal response to training. Highly individualized — athletes may report different sRPEs for the same session. Compare individual chronic patterns to acute changes to identify excessive load progression.', tags: ['nasm', 'monitoring', 'high-yield'] },
          { q: 'What is the acute-to-chronic workload ratio (ACWR)?', a: 'A ratio comparing recent fatigue (acute, last week) to fitness base (chronic, average of last 4 weeks). Ideal range: 1.0-1.5. ACWR >1.5 = 2-4× injury risk. ACWR ≥2.0 = up to 7× injury risk. ACWR <1.0 indicates detraining. A clinical tool — should inform but not solely drive program changes.', tags: ['nasm', 'monitoring', 'high-yield', 'foundational'] },
          { q: 'Calculate ACWR for a runner averaging 50 miles/week for 4 weeks who runs 75 miles this week.', a: 'ACWR = 75 ÷ 50 = 1.5. Right at the upper end of the ideal range and trending toward elevated injury risk. Coach should monitor closely and avoid further acute increases.', tags: ['nasm', 'monitoring'] },
          { q: 'What is the role of multiplanar training in injury resilience?', a: 'All muscles function eccentrically, isometrically, and concentrically in the sagittal, frontal, and transverse planes. An integrated training program should use a multiplanar approach throughout the entire muscle contraction spectrum. Restricts to a single plane miss the demands of real sport movement.', tags: ['nasm', 'rehab'] },
          { q: 'What is vertical loading?', a: 'A circuit-style approach where the athlete performs a series of exercises in succession, completes one round, then starts the next round from the first exercise. Enhances metabolic efficiency, mimics athletic workloads, and increases time efficiency.', tags: ['nasm', 'programming'] },
          { q: 'What is compound (complex) training in the NASM model?', a: 'Biomechanically similar exercises performed in succession with little/no rest — a super-set. The strength exercise for a body part is performed first, immediately followed by a biomechanically similar stabilization exercise. Example: bench press → push-ups. Develops strength, endurance, hypertrophy, and metabolic efficiency simultaneously.', tags: ['nasm', 'programming'] },
        ]
      },
      {
        id: 'youth-ltad',
        title: 'Youth Development & LTAD',
        cards: [
          { q: 'What is the youth Physical Inactivity Triad (PIT)?', a: 'Faigenbaum et al. (2018) framework depicting three interrelated issues in youth: (1) Exercise deficit disorder — insufficient physical activity. (2) Pediatric dynapenia — low muscular strength/power for age. (3) Physical illiteracy — poor fundamental movement skill competency. All three contribute to long-term health and athletic deficits.', tags: ['nasm', 'youth', 'high-yield'] },
          { q: 'What is the current physical activity recommendation for ages 6-17?', a: '60+ minutes of moderate-to-vigorous physical activity daily. Most should be aerobic, with vigorous-intensity activity on at least 3 days/week. Muscle-strengthening activity at least 3 days/week. Bone-strengthening activity at least 3 days/week. Only 24% of US youth currently meet these standards.', tags: ['nasm', 'youth', 'high-yield'] },
          { q: 'Distinguish chronological, biological, and training age.', a: 'Chronological age: time since birth (e.g., 14.75 years). Biological age: maturity status — can vary widely from chronological (a 14.75-year-old early maturer may have biological age 16.4; late maturer 12.2). Training age: years of structured training, mode-specific (a 14-year-old may have 0 strength training age despite multiple sport years).', tags: ['nasm', 'youth', 'high-yield', 'foundational'] },
          { q: 'What is the relative age effect?', a: 'Athletes born earlier in the selection year (Q1: Jan-Mar) tend to be overrepresented on competitive rosters, especially at young ages, because their relative maturity advantage leads to more selections and developmental opportunities. Originally identified in junior hockey; observed across many sports.', tags: ['nasm', 'youth'] },
          { q: 'Name the four phases of physical growth.', a: '(1) Rapid growth in infancy. (2) Steady growth in mid-childhood. (3) Rapid growth during adolescent growth spurt. (4) Deceleration until adult height is attained. Body composition changes accompany growth — females accrue more fat mass, males more muscle and bone during adolescence.', tags: ['nasm', 'youth'] },
          { q: 'What are Scammon\'s curves?', a: 'Classic 1930 model describing differential growth rates of body systems: lymphoid (peaks ~12, then declines), neural (rapid early growth, near adult size before adolescence), general/somatic (S-curve following height/weight), and reproductive (slow childhood, rapid puberty). Explains why nervous system trains differently than other systems in youth.', tags: ['nasm', 'youth'] },
          { q: 'Why is the principle "children are not miniature adults" emphasized?', a: 'Children show age- and maturity-related changes in body size, composition, physiological function, fitness, cognition, emotions, and behaviors. Programming must match developmental and cognitive ages, not just chronological. Complexity of instruction, attention span, and exercise choice all need to be developmentally appropriate.', tags: ['nasm', 'youth', 'foundational'] },
          { q: 'What is Long-Term Athlete Development (LTAD)?', a: 'Evidence-based framework for sequencing youth athletic development across childhood, adolescence, and adulthood. Emphasizes appropriate skill and biomotor development at sensitive periods, avoiding early specialization, and building broad athletic foundations before sport-specific demands.', tags: ['nasm', 'youth', 'high-yield'] },
        ]
      },
    ]
  },
  phase7: {
    id: 'phase7',
    title: 'Phase VII — Sport Psychology',
    subtitle: 'Mental performance, motor learning, athlete wellbeing',
    color: '#00B4D8',
    icon: 'Brain',
    description: 'Chapter 8 of NSCA Essentials. ~24% of the Scientific Foundations section (19 of 80 scored questions) — heavily underestimated by candidates.',
    domains: [
      {
        id: 'arousal-anxiety',
        title: 'Arousal, Anxiety & Performance',
        cards: [
          { q: 'Define arousal in the context of sport.', a: 'A blend of physiological and psychological activation — the intensity of motivation at a given moment. Exists on a continuum from deep sleep to extreme excitement. Indexed via HR, BP, EEG, EMG, and catecholamines. Not inherently positive or negative — just a measure of activation.', tags: ['psych', 'high-yield', 'foundational'] },
          { q: 'Distinguish arousal from anxiety.', a: 'Arousal: neutral activation. Anxiety: a subcategory of arousal involving negative emotions — nervousness, worry, apprehension. State anxiety: temporary, situation-specific. Trait anxiety: stable personality predisposition toward perceiving situations as threatening.', tags: ['psych', 'high-yield'] },
          { q: 'Explain the Inverted-U Theory (Yerkes-Dodson Law).', a: 'Performance improves with arousal up to an optimal point, then declines as arousal continues to rise. Drawn as an inverted-U curve. Original 1908 Yerkes-Dodson study. The optimal arousal point shifts based on task complexity, skill level, experience, and individual differences.', tags: ['psych', 'high-yield', 'foundational'] },
          { q: 'How does task complexity shift the optimal arousal level?', a: 'Simple, well-learned tasks (e.g., heavy deadlift, sprint) tolerate and benefit from higher arousal — closer to the right side of the inverted-U. Complex, novel, or fine-motor tasks (e.g., archery, free throw, golf putt) require lower optimal arousal. This is why "psyching up" works for power but hurts precision sports.', tags: ['psych', 'high-yield'] },
          { q: 'Describe Drive Theory and how it differs from the Inverted-U.', a: 'Drive Theory: performance is a linear function of arousal × skill — more arousal always = better performance for well-learned tasks. The Inverted-U refines this by adding the performance decline at high arousal, especially for complex tasks. Drive Theory fits trained powerlifting at max effort; Inverted-U fits most sport contexts.', tags: ['psych'] },
          { q: 'Explain the Catastrophe Theory.', a: 'A more nuanced model than the Inverted-U: at high cognitive (state) anxiety, the performance decline isn\'t gradual — it crashes catastrophically and is difficult to recover from. Explains why athletes who "choke" often struggle to regain their groove mid-competition rather than smoothly returning to optimal performance.', tags: ['psych', 'high-yield'] },
          { q: 'What is the Individualized Zones of Optimal Functioning (IZOF) model?', a: 'Hanin\'s model: each athlete has their own optimal pre-competition emotional state that produces best performance. Some athletes perform best calm, others "amped up." Coaching arousal regulation must be individualized — there is no universal optimal state.', tags: ['psych'] },
        ]
      },
      {
        id: 'motivation-attention',
        title: 'Motivation, Attention & Confidence',
        cards: [
          { q: 'Distinguish intrinsic from extrinsic motivation.', a: 'Intrinsic: drive from internal sources — enjoyment, mastery, personal challenge, sense of accomplishment. More durable and predictive of long-term athletic development. Extrinsic: drive from external rewards — trophies, scholarships, money, recognition. Useful for short-term but undermines intrinsic motivation when used to control behavior.', tags: ['psych', 'high-yield', 'foundational'] },
          { q: 'What is Self-Determination Theory (SDT)?', a: 'Deci & Ryan: humans have three basic psychological needs — autonomy (sense of choice), competence (sense of capability), relatedness (sense of connection). Meeting these supports intrinsic motivation. Coaching environments that meet these needs produce more durable engagement and performance.', tags: ['psych', 'high-yield'] },
          { q: 'What is positive reinforcement and how is it used in coaching?', a: 'Presenting a desirable stimulus after a desired behavior to increase the likelihood of that behavior recurring. Praise, points, recognition. NSCA emphasizes positive reinforcement over punishment — punishment reduces unwanted behavior but doesn\'t teach the desired one and damages coach-athlete relationship.', tags: ['psych'] },
          { q: 'Distinguish positive reinforcement from negative reinforcement.', a: 'Positive reinforcement: ADDING something pleasant (praise) to increase a behavior. Negative reinforcement: REMOVING something unpleasant (extra conditioning) when the desired behavior occurs. Both increase behavior — they\'re NOT punishment. Negative reinforcement is often confused with punishment in popular use.', tags: ['psych', 'high-yield'] },
          { q: 'Distinguish broad vs narrow and internal vs external attentional focus.', a: 'Nideffer\'s 2D attentional model. Broad-external: scanning the field (QB reading defense). Broad-internal: strategy/planning. Narrow-external: focus on one external target (free throw at the rim). Narrow-internal: body awareness, single thought. Different sport demands need different attentional styles, and athletes can be trained to shift between them.', tags: ['psych', 'high-yield'] },
          { q: 'What is the difference between internal and external cuing?', a: 'Internal cuing: directing attention to body parts ("squeeze your glutes," "extend your elbow"). External cuing: directing attention to the movement outcome or environment ("drive the floor away," "push the bar toward the ceiling"). External cuing generally produces better motor performance and learning, especially in skilled athletes.', tags: ['psych', 'motor-learning', 'high-yield'] },
          { q: 'Define self-efficacy.', a: 'Bandura\'s concept: an individual\'s belief in their ability to successfully execute a specific task in a specific situation. Distinct from general self-esteem. The single strongest psychological predictor of athletic performance. Built through performance accomplishments, vicarious experience (watching similar others succeed), verbal persuasion, and emotional state management.', tags: ['psych', 'high-yield'] },
          { q: 'What is positive self-talk?', a: 'Internal verbal statements that promote confidence, focus, and emotional control. Two types: motivational ("I\'ve got this," "drive!") and instructional ("knees out," "stay tall"). Both improve performance. Negative self-talk predicts poorer performance and should be actively replaced.', tags: ['psych'] },
        ]
      },
      {
        id: 'mental-techniques',
        title: 'Mental Skills & Goal Setting',
        cards: [
          { q: 'What is mental imagery (visualization)?', a: 'Mentally rehearsing performance using multiple senses (visual, kinesthetic, auditory). Activates similar neural patterns to actual performance. Effective for skill acquisition, confidence building, arousal regulation, and recovery from injury. PETTLEP model (Physical, Environment, Task, Timing, Learning, Emotion, Perspective) provides a framework.', tags: ['psych', 'high-yield'] },
          { q: 'What are SMART goals?', a: 'Specific, Measurable, Attainable, Realistic, Time-bound. The classic goal-setting framework. Generic goals ("get better") produce less behavioral change than SMART goals ("add 20 lbs to my squat in 8 weeks training 3x/week"). The specificity drives focused effort.', tags: ['psych', 'high-yield'] },
          { q: 'Distinguish outcome, performance, and process goals.', a: 'Outcome goals: results compared to others (win the championship). Performance goals: personal standards (run sub-11s 100m). Process goals: focus on actions/technique (drive knees through transition phase). Performance and process goals are within the athlete\'s control; outcome goals are not. Best programs combine all three.', tags: ['psych', 'high-yield'] },
          { q: 'What are relaxation techniques used in sport?', a: 'Diaphragmatic breathing (slow, deep belly breathing), progressive muscle relaxation (sequential tension-release of muscle groups), autogenic training (self-suggested warmth and heaviness), and biofeedback. Used to manage anxiety, lower arousal before precision events, and improve recovery between bouts.', tags: ['psych'] },
          { q: 'What is energy management (arousal regulation)?', a: 'Strategies to increase arousal when flat (vigorous warm-up, upbeat music, motivational self-talk, dynamic imagery) or decrease arousal when over-aroused (breathing, calming imagery, slower routine, environmental control). Critical pre-competition skill.', tags: ['psych'] },
          { q: 'What is "pre-performance routine"?', a: 'A consistent sequence of cognitive and behavioral actions an athlete performs immediately before a key task (free throw, putt, kick). Reduces anxiety, focuses attention, primes execution. Highly individualized but typically includes physical preparation, mental cue, and trigger action.', tags: ['psych'] },
        ]
      },
      {
        id: 'motor-learning',
        title: 'Motor Learning & Skill Acquisition',
        cards: [
          { q: 'Name the three stages of motor learning (Fitts & Posner model).', a: '(1) Cognitive stage: athlete focuses on understanding the task; slow, deliberate, error-prone. (2) Associative stage: refining movement, fewer errors, more consistent. (3) Autonomous stage: skill is automatic, attention free for tactics and environment. Coaches cue differently at each stage.', tags: ['motor-learning', 'high-yield', 'foundational'] },
          { q: 'Distinguish knowledge of results (KR) and knowledge of performance (KP).', a: 'Knowledge of results (KR): feedback about the OUTCOME of the movement ("you missed left"). Knowledge of performance (KP): feedback about the MOVEMENT QUALITY itself ("your elbow dropped during release"). KP is more useful for technique acquisition; KR drives outcome motivation. Both have a role.', tags: ['motor-learning', 'high-yield'] },
          { q: 'When should feedback be given — every rep or intermittently?', a: 'Continuous feedback aids early learning (cognitive stage) but creates dependency. Faded feedback (gradually reducing frequency) and summary feedback (after every few reps) promote better long-term retention. Bandwidth feedback (only when performance falls outside acceptable range) is also effective for skilled athletes.', tags: ['motor-learning', 'high-yield'] },
          { q: 'Compare blocked and random practice.', a: 'Blocked practice: same skill repeated (10 free throws, then 10 layups, then 10 jump shots). Better for acquisition during the cognitive stage. Random practice: skills mixed unpredictably. Worse during practice but better for long-term retention and transfer to game-like contexts. Counterintuitive but well-replicated — the "contextual interference effect."', tags: ['motor-learning', 'high-yield'] },
          { q: 'Distinguish whole vs part practice.', a: 'Whole practice: the entire skill is practiced as a unit. Best for skills that are highly integrated (golf swing, Olympic lifts). Part practice: skill is broken into components (segmentation), practiced separately, then combined. Best for complex skills with discrete phases (serial skills) or low task complexity with high organization.', tags: ['motor-learning', 'high-yield'] },
          { q: 'What is massed vs distributed practice?', a: 'Massed: long practice sessions with little rest between attempts. Distributed: shorter sessions with more rest. Distributed practice generally produces better learning, especially for novel skills or fatiguing tasks. Massed practice may be appropriate for time-limited skill review.', tags: ['motor-learning'] },
          { q: 'What is the difference between performance and learning in motor skill?', a: 'Performance: temporary expression of skill during practice. Learning: relatively permanent change in capability inferred from performance. Many variables boost short-term performance but hurt learning (e.g., blocked practice, immediate continuous feedback). Coaches should design for LEARNING, not practice performance.', tags: ['motor-learning', 'high-yield'] },
          { q: 'What are the open and closed skill classifications?', a: 'Closed skills: performed in stable, predictable environments — execution-focused (free throw, deadlift, gymnastics routine). Open skills: performed in dynamic, unpredictable environments — adaptation-focused (defending in soccer, returning a tennis serve). Open skills require perceptual training; closed skills require precision repetition.', tags: ['motor-learning'] },
        ]
      },
      {
        id: 'mental-health',
        title: 'Mental Health & Eating Disorders',
        cards: [
          { q: 'What are common mental health issues in athletes?', a: 'Anxiety disorders (generalized, social, performance-specific). Depression. Substance misuse. Eating disorders (especially in aesthetic/weight-class sports). PTSD (more common in contact sports and after injury). Athletes face stigma — many underreport. Rates are similar to or higher than non-athletes for several conditions.', tags: ['psych', 'mental-health', 'high-yield'] },
          { q: 'What signs of anxiety should a coach watch for?', a: 'Persistent worry, restlessness, irritability, sleep disruption, fatigue, difficulty concentrating, muscle tension, panic-like symptoms before competition, excessive avoidance, somatic complaints (headaches, stomach issues). Performance-specific anxiety often manifests as choking, freezing, or systematic underperformance in competition vs practice.', tags: ['psych', 'mental-health', 'high-yield'] },
          { q: 'What signs of depression should a coach watch for?', a: 'Persistent low mood, loss of interest/pleasure (anhedonia), changes in sleep and appetite, fatigue, feelings of worthlessness, difficulty concentrating, social withdrawal, declining performance, and in severe cases thoughts of self-harm. Refer to mental health professionals immediately when suspected.', tags: ['psych', 'mental-health', 'high-yield'] },
          { q: 'List the diagnostic features of anorexia nervosa.', a: 'Restriction of caloric intake leading to significantly low body weight. Intense fear of gaining weight. Distorted body image — sees self as overweight when underweight. May be restricting type or binge-eating/purging type. Common in aesthetic sports (gymnastics, dance, figure skating) and weight-class sports.', tags: ['psych', 'eating-disorders', 'high-yield'] },
          { q: 'List the diagnostic features of bulimia nervosa.', a: 'Recurrent binge eating episodes (eating large amounts with sense of lack of control). Recurrent compensatory behaviors to prevent weight gain (vomiting, laxatives, diuretics, fasting, excessive exercise). Self-evaluation unduly influenced by body shape/weight. Episodes occur at least once weekly for 3+ months. Often normal body weight, making detection harder.', tags: ['psych', 'eating-disorders', 'high-yield'] },
          { q: 'What is binge eating disorder?', a: 'Recurrent episodes of binge eating WITHOUT regular compensatory behaviors. Eating until uncomfortably full, alone due to embarrassment, feeling disgusted/depressed after. The most common eating disorder. Less talked about in athletes but occurs.', tags: ['psych', 'eating-disorders'] },
          { q: 'What is disordered eating vs an eating disorder?', a: 'Disordered eating: abnormal eating behaviors and attitudes that don\'t meet full diagnostic criteria (skipping meals, restrictive dieting, occasional purging). Eating disorder: meets DSM-5 diagnostic criteria. Disordered eating is much more prevalent in athletes and is a risk factor for developing a full clinical eating disorder.', tags: ['psych', 'eating-disorders', 'high-yield'] },
          { q: 'What is the coach\'s role with suspected eating disorders or mental health issues?', a: 'Notice signs and document. Approach the athlete privately, compassionately, and without diagnosis. REFER to qualified mental health professional, registered dietitian, and team physician. Do NOT attempt to treat. Maintain confidentiality. Continue normal coach-athlete relationship. Mental health treatment is OUTSIDE the S&C scope of practice.', tags: ['psych', 'professional', 'high-yield'] },
          { q: 'What is the psychological impact of injury?', a: 'Common emotional responses: denial, anger, bargaining, depression, acceptance (Kübler-Ross stages applied to injury). Specific: fear of reinjury, identity disruption (especially for high-investment athletes), social isolation, financial stress, loss of structure. Psychological readiness for RTP is now considered as important as physical readiness.', tags: ['psych', 'injury', 'high-yield'] },
          { q: 'Signs and symptoms of substance misuse to watch for.', a: 'Behavioral changes (mood swings, withdrawal from team/social, declining performance). Physical signs (red eyes, weight changes, poor hygiene, tremors). Performance markers (missed practices, decreased coordination, slower reaction times). Confidentiality and referral are critical — coaches are not investigators or counselors.', tags: ['psych', 'mental-health'] },
        ]
      },
    ]
  },
  phase8: {
    id: 'phase8',
    title: 'Phase VIII — Nutrition',
    subtitle: 'Macros, hydration, ergogenics, body composition',
    color: '#F4A261',
    icon: 'Dumbbell',
    description: 'Chapters 9-11 of NSCA Essentials. ~21% of Scientific Foundations (17 of 80 scored questions). The most underweighted topic by most candidates.',
    domains: [
      {
        id: 'macronutrients',
        title: 'Macronutrients & Daily Needs',
        cards: [
          { q: 'What are the three macronutrients and their caloric values?', a: 'Carbohydrate: 4 kcal/g. Protein: 4 kcal/g. Fat: 9 kcal/g. (Alcohol: 7 kcal/g, but not a macronutrient.) Macronutrients provide energy; micronutrients (vitamins, minerals) do not. Total daily energy is the sum of all macros consumed.', tags: ['nutrition', 'high-yield', 'foundational'] },
          { q: 'What carbohydrate intake supports athletes?', a: 'Light training: 3-5 g/kg/day. Moderate training (~1 hr/day): 5-7 g/kg/day. High-volume endurance training (1-3 hr/day): 6-10 g/kg/day. Very high volume (>4 hrs/day): 8-12 g/kg/day. Essential for glycogen replenishment and high-intensity performance.', tags: ['nutrition', 'high-yield'] },
          { q: 'What is the recommended protein intake for strength/power athletes?', a: '1.6-2.2 g/kg/day (Morton et al. 2017 meta-analysis: benefits plateau at 1.6 g/kg, 95% CI extends to 2.2). Higher intakes (up to 3 g/kg) are safe but not additive. Distributing across 4-5 meals at 0.4-0.55 g/kg per meal maximizes 24-hour MPS.', tags: ['nutrition', 'high-yield', 'foundational'] },
          { q: 'What protein intake supports endurance athletes?', a: '1.2-1.6 g/kg/day. Lower than strength athletes because protein turnover demands differ. Still higher than the RDA (0.8 g/kg) for sedentary adults. Endurance athletes in heavy training or caloric restriction may benefit from the upper end.', tags: ['nutrition', 'high-yield'] },
          { q: 'What is the leucine threshold?', a: 'Approximately 2.5-3 grams of leucine per meal is needed to maximally trigger muscle protein synthesis via mTOR pathway activation. Achieved by ~20-30 g high-quality protein per meal. Lower-quality plant proteins may need ~40 g per meal to hit the threshold.', tags: ['nutrition', 'high-yield'] },
          { q: 'What fat intake is recommended for athletes?', a: '20-35% of total calories from fat (per ACSM/DC consensus). Below 20% can impair hormonal function. Athletes should emphasize unsaturated fats. Severely low-fat diets (<15% of calories) can suppress testosterone in male athletes and disrupt menstrual function in female athletes.', tags: ['nutrition', 'high-yield'] },
          { q: 'What are essential amino acids?', a: 'Nine amino acids that cannot be synthesized by the body and must be obtained from diet: histidine, isoleucine, leucine, lysine, methionine, phenylalanine, threonine, tryptophan, valine. Branched-chain amino acids (BCAAs): leucine, isoleucine, valine — most studied for muscle.', tags: ['nutrition'] },
          { q: 'Distinguish complete and incomplete proteins.', a: 'Complete proteins contain all 9 essential amino acids in adequate amounts (most animal sources, soy, quinoa). Incomplete proteins lack one or more essential amino acids (most plant proteins). Combining complementary plant proteins (rice + beans) produces a complete amino acid profile.', tags: ['nutrition'] },
          { q: 'What is the glycemic index?', a: 'A ranking of carbohydrates by their effect on blood glucose. High GI (>70): rapid spike (white bread, sports drinks, glucose). Moderate GI (56-69): brown rice, oatmeal. Low GI (<55): most legumes, sweet potato, most vegetables. High-GI carbs are useful immediately post-workout; lower-GI carbs are preferred otherwise.', tags: ['nutrition', 'high-yield'] },
          { q: 'What is caloric density vs nutrient density?', a: 'Caloric density: calories per unit weight/volume of food. Nutrient density: amount of beneficial nutrients (vitamins, minerals, protein, fiber) per calorie. Athletes often need calorically dense foods to meet energy needs but should still prioritize nutrient-dense choices to support recovery and health.', tags: ['nutrition'] },
        ]
      },
      {
        id: 'nutrient-timing',
        title: 'Nutrient Timing & Hydration',
        cards: [
          { q: 'What should a pre-workout meal contain?', a: 'Eaten 1-4 hours pre-exercise. Higher in carbohydrates (1-4 g/kg, scaling with time pre), moderate protein (~0.25 g/kg), low fat and fiber (slow gastric emptying). Closer to exercise = smaller, more easily digested. Familiar foods only — never experiment before competition.', tags: ['nutrition', 'high-yield'] },
          { q: 'What is during-exercise fueling guidance?', a: 'For exercise <60 min: water is sufficient. 60-150 min: 30-60 g CHO/hour (sports drinks, gels). >150 min: up to 90 g CHO/hour using multiple-transportable carbs (glucose + fructose 2:1 ratio). Electrolytes during prolonged or hot conditions.', tags: ['nutrition', 'high-yield'] },
          { q: 'What is post-workout nutrition recommendation?', a: 'Within ~2 hours: 0.3-0.4 g/kg protein (20-40g) to maximally stimulate MPS. Carbohydrate to replenish glycogen — 1-1.2 g/kg/hour for 4 hours if rapid recovery needed (twice-daily training); less critical if next session is >24 hours away. Total daily intake matters more than precise timing.', tags: ['nutrition', 'high-yield'] },
          { q: 'What is the current view of the anabolic window?', a: 'The post-workout window for nutrition was once thought to be ~30 minutes. Aragon & Schoenfeld and current evidence: window is much wider — likely several hours, extended further if a pre-workout meal was consumed. Total daily protein intake and distribution matter more than precise timing.', tags: ['nutrition', 'high-yield'] },
          { q: 'What hydration loss impairs performance?', a: '2% body mass loss impairs strength, power, and endurance. Cognitive function declines even sooner. 5% loss significantly impairs aerobic performance. 7-10% loss is medically dangerous and can cause heat illness.', tags: ['nutrition', 'high-yield', 'foundational'] },
          { q: 'What is the pre-, during-, and post-exercise hydration protocol?', a: 'Pre: 5-7 mL/kg in the 4 hours before exercise. Add 3-5 mL/kg in last 2 hours if urine is dark. During: 0.4-0.8 L/hour, adjusted for conditions and sweat rate. Post: 125-150% of weight lost (~1.25-1.5 L per kg lost) within 4-6 hours.', tags: ['nutrition', 'high-yield'] },
          { q: 'How is sweat rate calculated?', a: '(Pre-exercise weight − post-exercise weight + fluids consumed − urine output) ÷ exercise duration. Result in liters/hour. Highly individual: ranges from 0.5 L/hr to >3 L/hr in elite athletes in heat. Used to individualize hydration protocols.', tags: ['nutrition'] },
          { q: 'What electrolytes are most relevant for athletes?', a: 'Sodium (the main electrolyte lost in sweat — 500-2,000 mg/L). Potassium (smaller losses but important for muscle function). Magnesium and calcium (smaller losses). Sodium replacement matters most for prolonged/hot/heavy-sweating athletes. Severe sodium loss can cause hyponatremia, especially in endurance athletes overhydrating with plain water.', tags: ['nutrition', 'high-yield'] },
          { q: 'What is exercise-associated hyponatremia?', a: 'Dangerously low blood sodium concentration during/after prolonged exercise, typically from overhydration with plain water diluting sodium. Symptoms: headache, nausea, confusion, seizures, coma. Risk factors: long-duration events, slow finishers, overaggressive hydration. Treatment requires medical intervention.', tags: ['nutrition', 'high-yield'] },
        ]
      },
      {
        id: 'body-composition',
        title: 'Body Composition & Weight Management',
        cards: [
          { q: 'What is the energy balance equation for body weight change?', a: 'Energy intake vs energy expenditure. Surplus → weight gain. Deficit → weight loss. Roughly 3,500 kcal = 1 lb of body fat (oversimplified but useful). Composition of weight change (fat vs muscle) depends on training stimulus, protein intake, and total deficit magnitude.', tags: ['nutrition', 'high-yield', 'foundational'] },
          { q: 'What is a reasonable rate of fat loss for athletes?', a: '0.5-1% of body weight per week. Faster rates (>1.5%/wk) sacrifice lean mass and impair training quality, recovery, and hormones. Energy deficit of 300-500 kcal/day for most athletes. Aggressive cuts only with periodization away from competition.', tags: ['nutrition', 'high-yield'] },
          { q: 'How should protein change during a caloric deficit?', a: 'Increase to ~2.3-3.1 g/kg of FAT-FREE mass (or ~2.0-2.4 g/kg of total body weight). Protein needs are HIGHER in a deficit to spare lean mass when total energy is limited. Combined with resistance training, this maximizes fat loss while preserving muscle.', tags: ['nutrition', 'high-yield'] },
          { q: 'What is a reasonable rate of muscle gain?', a: 'Untrained: 1-2 lbs/month. Intermediate: 0.5-1 lb/month. Advanced: 0.25-0.5 lb/month or less. Requires caloric surplus (~250-500 kcal/day), adequate protein, and progressive resistance training. Faster gains require larger surpluses and yield more fat alongside muscle.', tags: ['nutrition'] },
          { q: 'What methods exist for body composition assessment?', a: 'Skinfold (Jackson-Pollock, Durnin-Womersley equations) — inexpensive but technician-dependent. Bioelectrical impedance (BIA) — affected by hydration. Hydrostatic (underwater) weighing — gold standard, complex. DEXA — gold standard for body fat % and bone density. Air displacement plethysmography (Bod Pod). Each has error ~2-4%.', tags: ['nutrition', 'high-yield'] },
          { q: 'What are typical body fat ranges for athletes?', a: 'Essential fat: ~3% (men), ~12% (women). Athletes: men 6-13%, women 14-20%. General fitness: men 14-17%, women 21-24%. Sport-specific: distance runners often 5-10% men / 10-15% women; football linemen may be 15-25%. Lower isn\'t always better — too low impairs hormones and performance.', tags: ['nutrition'] },
          { q: 'What is RED-S (Relative Energy Deficiency in Sport)?', a: 'IOC consensus: impaired physiological function caused by chronic low energy availability. Affects metabolic rate, menstrual function, bone health, immunity, protein synthesis, cardiovascular health, psychological function. Replaced the older "Female Athlete Triad" (LEA + menstrual dysfunction + low BMD) — recognized to affect both sexes.', tags: ['nutrition', 'special-pops', 'high-yield', 'foundational'] },
        ]
      },
      {
        id: 'ergogenics',
        title: 'Ergogenic Aids & Supplements',
        cards: [
          { q: 'What is an ergogenic aid?', a: 'Any substance, technique, or device intended to enhance physical performance. Categories: nutritional (creatine, caffeine), pharmacological (anabolic steroids, EPO), physiological (blood doping, altitude training), psychological (imagery, hypnosis), mechanical (compression, swimsuits).', tags: ['nutrition', 'ergogenics', 'high-yield'] },
          { q: 'How does creatine monohydrate work?', a: 'Increases intramuscular creatine phosphate stores by ~20%. Faster CP-ATP resynthesis = more reps with heavy weights, faster recovery between sets. Also draws water into muscle cells (cell volumization). Dose: 3-5 g/day. Optional loading: 20 g/day × 5-7 days. Most evidence-supported sports supplement after caffeine.', tags: ['nutrition', 'ergogenics', 'high-yield', 'foundational'] },
          { q: 'What are common side effects and concerns of creatine?', a: 'Generally safe in healthy adults. Common: minor water weight gain (1-3 lbs in first weeks). NOT linked to kidney damage in healthy individuals (despite persistent myth). No definitive evidence of muscle cramping or dehydration risk. May benefit cognitive function. Caution only in pre-existing kidney disease.', tags: ['nutrition', 'ergogenics', 'high-yield'] },
          { q: 'How does caffeine work as an ergogenic aid?', a: 'Adenosine receptor antagonist — blocks adenosine binding, reducing perceived effort. Stimulates CNS, increases catecholamines, may enhance fat oxidation. Dose: 3-6 mg/kg, 30-60 min pre-exercise. Improves endurance, strength, power, reaction time. Caffeine tolerance reduces effect.', tags: ['nutrition', 'ergogenics', 'high-yield'] },
          { q: 'How does beta-alanine work?', a: 'Precursor to carnosine, an intramuscular pH buffer. Increases buffering capacity, delaying H⁺ accumulation in glycolytic exercise. Most effective for efforts 1-4 minutes (high glycolytic load). Dose: 3-6 g/day, split into smaller doses to reduce paresthesia (tingling). Takes 4+ weeks to saturate muscle.', tags: ['nutrition', 'ergogenics', 'high-yield'] },
          { q: 'How does sodium bicarbonate work?', a: 'Extracellular buffer — raises blood bicarbonate, helping clear H⁺ from working muscle. Dose: 0.2-0.4 g/kg, 60-90 min pre-exercise. Effective for 1-7 minute high-intensity efforts. Common GI side effects (cramping, diarrhea); split-dose protocols may help.', tags: ['nutrition', 'ergogenics'] },
          { q: 'What is carbohydrate loading?', a: 'Strategy to maximize muscle glycogen stores before endurance events >90 minutes. Classic protocol: 3-day depletion + 3-day high-CHO. Modern protocol: 1-3 days of high-CHO (8-12 g/kg/day) with tapered training. Increases glycogen 50-100%, improving endurance performance.', tags: ['nutrition', 'high-yield'] },
          { q: 'What are anabolic-androgenic steroids and their effects?', a: 'Synthetic derivatives of testosterone. Increase muscle protein synthesis, decrease breakdown, increase aggression and training capacity. Side effects: hormonal suppression (HPG axis shutdown), gynecomastia, acne, cardiovascular (cardiomyopathy, atherogenic lipid changes), hepatic stress (oral steroids), psychological. Banned in nearly all sport.', tags: ['nutrition', 'ergogenics', 'high-yield'] },
          { q: 'What is blood doping (EPO)?', a: 'Practices that increase red blood cell count to boost oxygen-carrying capacity. Methods: transfusion of own or donor blood, or erythropoietin (EPO) injection. Banned in sport. Risks: dangerously thickened blood, stroke, heart attack, death. Detected via blood passport profiles tracking hemoglobin and reticulocytes.', tags: ['nutrition', 'ergogenics'] },
          { q: 'What is the role of multivitamins for athletes?', a: 'Most athletes don\'t need supplementation if eating a balanced diet. Specific deficiencies that may warrant supplementation: vitamin D (especially indoor/winter athletes), iron (especially female endurance athletes), B12 (vegan athletes), omega-3 (low fish intake). Test before supplementing rather than guessing.', tags: ['nutrition'] },
        ]
      },
    ]
  },
  phase9: {
    id: 'phase9',
    title: 'Phase IX — Exercise Technique & Facility',
    subtitle: 'Lifting cues, spotting, flexibility, facility design',
    color: '#8338EC',
    icon: 'Dumbbell',
    description: 'Chapters 14-16 and 23-24 of NSCA Essentials. Covers ~36% Exercise Technique + ~11% Org/Admin of the Practical/Applied section — the heaviest video-question content.',
    domains: [
      {
        id: 'grips-stance',
        title: 'Grips, Stance & Lifting Positions',
        cards: [
          { q: 'Name the major grips used in resistance training.', a: 'Pronated (overhand): palms down, knuckles up. Supinated (underhand): palms up. Neutral: palms facing each other. Alternated/mixed: one pronated, one supinated (heavy deadlifts). Hook: thumb pinned to bar under fingers (Oly lifting). Open/false: thumb not wrapped around bar — dangerous in bench press ("suicide grip").', tags: ['technique', 'high-yield', 'foundational'] },
          { q: 'What is the closed grip?', a: 'The thumb is wrapped around the bar in opposition to the fingers, creating a complete circle. Required for safety on most lifts (especially overhead and over-face). Open/false grips lack this thumb wrap and increase the risk of the bar slipping.', tags: ['technique', 'high-yield'] },
          { q: 'When is the hook grip used?', a: 'Olympic weightlifting (clean, snatch, jerk) and heavy pulls. Thumb is wrapped against the bar first, then fingers grip OVER the thumb. Provides a more secure grip at high velocities than a closed grip but is uncomfortable until adapted.', tags: ['technique'] },
          { q: 'Distinguish narrow, hip-width, shoulder-width, and wide grips/stances.', a: 'Narrow: hands or feet closer than hip-width. Hip-width: ~hip-bone width apart. Shoulder-width: hands/feet under the shoulders. Wide: wider than shoulders. Grip/stance width affects muscle emphasis, ROM, leverage, and joint stress.', tags: ['technique'] },
          { q: 'What is the five-point body contact position?', a: 'Used for supine (lying) exercises — bench press, lying tricep extension. The five points: (1) head, (2) upper back/shoulders, (3) buttocks all firmly on the bench, plus (4) right foot and (5) left foot flat on the floor. Maintains stable base and spinal positioning.', tags: ['technique', 'high-yield'] },
          { q: 'What is proper breathing during resistance training?', a: 'General rule: exhale through the sticking point (concentric, hardest portion), inhale during the easier (eccentric) portion. Heavy near-max sets: the Valsalva maneuver (brief breath hold against closed glottis) increases intra-abdominal pressure and trunk stability. Valsalva creates dramatic BP spikes — contraindicated in cardiovascular populations.', tags: ['technique', 'high-yield'] },
          { q: 'When is a weightlifting belt appropriate?', a: 'Heavy near-maximal sets (>80% 1RM) on lifts loading the spine (squat, deadlift, overhead press). Increases intra-abdominal pressure stability. NOT appropriate for novices who haven\'t learned to brace without one. NOT for warm-up sets, lighter accessory work, or non-spinal-loaded lifts.', tags: ['technique', 'high-yield'] },
          { q: 'What is the standing position for lifting exercises?', a: 'Feet ~hip-width to shoulder-width apart, weight balanced over mid-foot. Knees slightly unlocked. Neutral spine — natural curves preserved. Chest up, shoulders back. Head in neutral alignment (gaze forward or slightly down, not extended). Core braced.', tags: ['technique'] },
        ]
      },
      {
        id: 'spotting',
        title: 'Spotting Procedures',
        cards: [
          { q: 'What is the spotter\'s primary responsibility?', a: 'Ensure safe completion of the lift. Communicate clearly with the lifter (signal start, count reps, agree on bail conditions). Maintain proper position close enough to assist but not interfering. Be physically capable of safely handling the load.', tags: ['safety', 'high-yield', 'foundational'] },
          { q: 'When is a spotter REQUIRED?', a: 'Overhead lifts (military press, push press). Lifts with the bar over the face/neck (bench press, lying triceps extension). Near-maximal attempts on free-weight lifts. Lifts performed outside a power rack with safeties.', tags: ['safety', 'high-yield'] },
          { q: 'When is a spotter CONTRAINDICATED?', a: 'Olympic lifts — clean, snatch, jerk. The bar must be dumped if the lift fails; spotting these is dangerous for both lifter and spotter due to speed and trajectory. Teach athletes to safely bail forward (snatch/jerk overhead) or backward (clean catch).', tags: ['safety', 'high-yield'] },
          { q: 'How many spotters are needed for a bench press?', a: 'One spotter at the head end is standard for most loads. Two side spotters (one each side) may be appropriate for very heavy loads or close-grip variations. Verbal commands and "liftoff" protocol agreed in advance. Spotter\'s hands ideally in alternated grip ready to assist the bar.', tags: ['safety', 'high-yield'] },
          { q: 'How is the squat spotted?', a: 'Power rack with safety arms set just below the bottom of the squat is the safest option. Human spotters: one centered behind the lifter or two side spotters at the bar. Spotter follows the lifter through the lift, hands tracking under the lifter\'s armpits/ribcage (not on the bar). Side spotters may grasp the bar if needed.', tags: ['safety'] },
          { q: 'How are dumbbell exercises spotted?', a: 'Spot as close to the dumbbells as possible — typically at the wrists or directly on the dumbbell ends, NOT on the upper arms (can cause elbow/shoulder injury). For chest exercises, spotter is at the head end and hands track under the lifter\'s wrists.', tags: ['safety'] },
          { q: 'What is a liftoff?', a: 'A spotter lifts the bar off the J-hooks (or floor on a bench) and hands it to the athlete in starting position. Common in bench press and shoulder press. Athlete and spotter agree on a verbal command in advance. Liftoffs are not required — athlete preference.', tags: ['safety'] },
        ]
      },
      {
        id: 'flexibility',
        title: 'Flexibility & Stretching',
        cards: [
          { q: 'Name the four primary stretching modalities.', a: 'Static: slow controlled stretch, hold at end-range 15-30+ sec. Ballistic: bouncing/momentum movements (higher injury risk). Dynamic: controlled sport-specific movements through ROM. PNF (Proprioceptive Neuromuscular Facilitation): combines isometric contraction with passive stretch.', tags: ['technique', 'flexibility', 'high-yield', 'foundational'] },
          { q: 'When should each stretching modality be used?', a: 'Dynamic: pre-training as part of warm-up. Static: post-training or in dedicated sessions (pre-training only after a general warm-up if flexibility is sport-essential). PNF: post-training or separate sessions for greatest ROM gains. Ballistic: with caution, in sport-specific contexts only.', tags: ['technique', 'flexibility', 'high-yield'] },
          { q: 'Why is prolonged pre-training static stretching discouraged?', a: 'Static stretches held >60 seconds before power/speed work acutely reduce force production and power output for 30-60+ minutes. Likely mechanisms: muscle-tendon unit compliance changes, decreased mechanoreceptor sensitivity, neural inhibition. Brief static (<30s) is less detrimental but still inferior to dynamic warm-up.', tags: ['technique', 'flexibility', 'high-yield'] },
          { q: 'Name the three PNF stretching techniques.', a: 'Hold-relax (HR): passive stretch → isometric contraction of target muscle → relaxation → deeper passive stretch. Contract-relax (CR): same but with concentric contraction. Hold-relax with agonist contraction (HRAC) / contract-relax-antagonist-contract (CRAC): adds active contraction of the OPPOSING muscle during the final stretch — most effective PNF method.', tags: ['technique', 'flexibility', 'high-yield'] },
          { q: 'Why does PNF stretching work?', a: 'Two neural mechanisms: (1) Autogenic inhibition — isometric contraction activates Golgi tendon organs, which inhibit the contracting muscle and allow deeper stretch. (2) Reciprocal inhibition — contracting the antagonist (HRAC) relaxes the target muscle further. Combined, produces greater ROM gains than static stretching alone.', tags: ['technique', 'flexibility', 'high-yield'] },
          { q: 'What is autogenic inhibition?', a: 'Reflexive relaxation of a muscle following its own isometric contraction. Mediated by Golgi tendon organs sensing increased tension. Underlies the effectiveness of PNF stretching\'s isometric contraction phase.', tags: ['neural', 'flexibility', 'high-yield'] },
          { q: 'What is reciprocal inhibition?', a: 'Reflexive relaxation of a muscle when its antagonist contracts. Example: contracting the quadriceps causes the hamstring to relax. Allows smooth joint movement and underlies the agonist-contraction phase of CRAC PNF technique.', tags: ['neural', 'flexibility', 'high-yield'] },
          { q: 'What is a dynamic warm-up?', a: 'Movement-based preparation that progressively increases core temperature, neural activation, and joint ROM. Examples: skips, lunges, leg swings, mobility flows, sport-specific drills. 5-15 minutes typical. Outperforms static stretching for performance and matches or exceeds it for injury reduction.', tags: ['technique', 'high-yield'] },
          { q: 'How long should static stretches be held for ROM improvement?', a: '15-30 seconds is standard. 30 seconds may be slightly more effective than shorter holds. Beyond 60 seconds shows diminishing returns. 2-4 repetitions per muscle group. For chronic ROM improvements: 2+ sessions per week for at least 5 weeks.', tags: ['technique', 'flexibility'] },
        ]
      },
      {
        id: 'facility-design',
        title: 'Facility Design & Layout',
        cards: [
          { q: 'What is the recommended ceiling height for an S&C facility?', a: '12-14 feet of clearance from the lowest point. Provides headroom for overhead lifts (jerks, push presses), jump training, medicine ball work, and Olympic lift catches. Insufficient height creates equipment limitations and safety hazards.', tags: ['facility', 'high-yield', 'foundational'] },
          { q: 'What is the recommended minimum distance from mirrors to equipment?', a: '6 inches minimum between mirrors and any equipment (racks, benches). Reduces risk of breakage from bumping during loading or movement. Mirrors should also be a minimum of 20 inches above the floor (above weight stack/dumbbell height).', tags: ['facility', 'high-yield'] },
          { q: 'What are the optimal temperature and humidity ranges?', a: 'Temperature: 68-78°F (72-78°F optimal for resistance training). Higher temperatures impair power output and increase heat illness risk. Humidity: should NOT exceed 60%. Higher humidity impairs evaporative cooling. Air exchange: 8-12 times per hour through proper ventilation.', tags: ['facility', 'high-yield'] },
          { q: 'What lighting is recommended for an S&C facility?', a: '50-100 lumens, brighter than a typical classroom or office. Combination of artificial and natural light when possible. All switches should be reachable from a wheelchair (ADA). Adequate lighting reduces injury risk and supports observation by coaches.', tags: ['facility', 'high-yield'] },
          { q: 'What flooring types are used in S&C facilities?', a: 'Rubber (interlocking tiles or rolled) — most common, durable, cushioned. Wood — used for weightlifting platforms (centers of platforms; rubber outer). Carpet — least expensive, less common in performance facilities. Turf — for sled work and ground-based movements. Each zone matched to its purpose.', tags: ['facility', 'high-yield'] },
          { q: 'What is the recommended minimum spacing between equipment?', a: 'Between racks: 3 feet minimum at the end of racked bars. Between platforms: at least 3 feet. Around plyometric/jump training areas: 6+ feet of unobstructed space. Around aerobic equipment: 2-3 feet for entry/exit. Wider spacing improves safety and traffic flow.', tags: ['facility', 'high-yield'] },
          { q: 'How is sound managed in an S&C facility?', a: 'Should be kept below 90 dB (OSHA threshold for hearing damage with prolonged exposure). Includes ambient music, dropped weights, and conversation. Acoustic treatment and proper flooring reduce noise. Headphones and warning signs near high-noise areas.', tags: ['facility'] },
          { q: 'How is the strength facility ideally located?', a: 'Ground floor is preferred (avoids dropped-weight noise/vibration and load-bearing limits on upper floors). Floor loading capacity should be at least 100 lb/ft². Accessible by ADA standards. Large double doors with removable center posts for equipment delivery. Supervision station with line of sight to entire facility.', tags: ['facility', 'high-yield'] },
          { q: 'What are the four phases of facility design?', a: '(1) Pre-design (needs analysis, feasibility study, master plan). (2) Design (architectural plans, equipment selection, specifications). (3) Construction (build-out, installations). (4) Pre-operation (equipment setup, staff training, policy development, safety checks).', tags: ['facility'] },
          { q: 'How are equipment items typically arranged in an S&C facility?', a: 'Stretching/warm-up area near entrance. Large structural lifts (squat racks, platforms) — usually along walls, often near mirrors. Plyometric area in open space. Dumbbells in central or wall-side rack. Machines along walls. Aerobic equipment in dedicated zone. Flow should support typical session order: warm-up → power → strength → assistance → conditioning.', tags: ['facility'] },
        ]
      },
      {
        id: 'safety-administration',
        title: 'Safety, Liability & Administration',
        cards: [
          { q: 'What policies should govern facility access?', a: 'Defined hours of operation. Required check-in for athletes. Supervision ratios (NSCA recommends ~1:10 for novice/intermediate). No solo training during off-hours. Restricted access to authorized athletes only. Posted rules including footwear, attire, equipment use, and conduct.', tags: ['admin', 'safety'] },
          { q: 'List items in a daily facility safety checklist.', a: 'Check equipment integrity (cables, bands, bars for cracks or burrs). Verify rack J-hooks and safety arms are secure. Test cardio equipment power and emergency stops. Inspect flooring for damage. Confirm AED is accessible and battery-checked. Confirm first-aid kit is stocked. Verify emergency exits unobstructed. Document inspection.', tags: ['admin', 'safety', 'high-yield'] },
          { q: 'What equipment maintenance frequencies are recommended?', a: 'Daily: visual inspection, wiping/cleaning, testing function. Weekly: detailed inspection of cables, bands, pads; tighten bolts. Monthly: thorough deep clean; lubricate moving parts; inspect plates and dumbbells. Annually: equipment certification/recertification by manufacturer or qualified technician.', tags: ['admin', 'safety'] },
          { q: 'What is an Emergency Action Plan (EAP)?', a: 'Written, facility-specific document detailing response to medical emergencies. Must include: chain of command, contact protocols, AED location, AED-certified personnel, first responder roles, transportation routes, communication tools (phones), and procedures for common emergencies (cardiac arrest, head/neck injury, heat illness, severe bleeding). Practiced annually minimum.', tags: ['admin', 'safety', 'high-yield', 'foundational'] },
          { q: 'What are common emergencies an EAP should address?', a: 'Sudden cardiac arrest. Head and neck injuries (concussion, spinal injury). Severe bleeding/lacerations. Exertional heat illness (heat exhaustion, heat stroke). Exertional rhabdomyolysis. Asthma attack. Diabetic emergencies (hypoglycemia, DKA). Mental health crises (panic attack, suicidal ideation). Allergic reactions/anaphylaxis.', tags: ['admin', 'safety', 'high-yield'] },
          { q: 'Define negligence in S&C practice.', a: 'Failure to exercise reasonable care that a similarly trained professional would in the same situation, resulting in harm. Four elements: duty, breach of duty, causation, and damages. Defenses include assumption of risk and waivers (limited protection). Documentation and adherence to professional standards are key protections.', tags: ['admin', 'safety', 'high-yield'] },
          { q: 'What are common litigation issues in S&C facilities?', a: 'Negligent supervision (inadequate staff-to-athlete ratios). Improper exercise prescription beyond an athlete\'s capability. Equipment-related injuries from poor maintenance. Failure to follow EAP. Heat illness and exertional rhabdomyolysis (especially preseason). Failure to refer when out of scope. Documentation is the primary defense.', tags: ['admin', 'safety', 'high-yield'] },
          { q: 'What documentation should an S&C coach maintain?', a: 'Pre-participation health screening and physician clearance. Informed consent (acknowledging risks). Training programs/logs. Attendance records. Injury reports. Equipment maintenance logs. Incident reports for any emergencies. Continuing education / certifications current. All documentation should be retained per institutional policy (typically 7+ years).', tags: ['admin', 'safety'] },
          { q: 'When should an S&C coach refer to other professionals?', a: 'Injuries beyond minor soreness → athletic trainer or physician. Persistent pain → sports medicine physician. Detailed nutrition planning → registered dietitian. Mental health concerns → counselor/psychologist. Detailed rehabilitation → physical therapist. Medical conditions → physician. Operating outside one\'s scope is both unethical and legally hazardous.', tags: ['admin', 'professional', 'high-yield'] },
        ]
      },
    ]
  },
  phase10: {
    id: 'phase10',
    title: 'Phase X — Functional Anatomy',
    subtitle: 'Joint-by-joint kinesiology of the musculoskeletal system',
    color: '#D62828',
    icon: 'Activity',
    description: 'Based on Neumann\'s Kinesiology of the Musculoskeletal System (4th ed.) — the standard text in DPT and graduate kinesiology programs. Region-by-region functional anatomy and clinical relevance.',
    domains: [
      {
        id: 'kinesiology-fundamentals',
        title: 'Kinesiology Fundamentals',
        cards: [
          { q: 'Define osteokinematics and arthrokinematics.', a: 'Osteokinematics: gross motion of bones in space (flexion, extension, abduction, etc.) described in cardinal planes. Arthrokinematics: the small accessory motions between joint surfaces (roll, glide, spin) that accompany osteokinematic motion. Both must be intact for full functional motion.', tags: ['anatomy', 'kinesiology', 'high-yield', 'foundational'] },
          { q: 'What are the three arthrokinematic motions?', a: 'Roll: one surface rolls on another like a tire on road (each new point contacts a new point). Glide/slide: one surface slides on another, same point contacting different points. Spin: rotation around a stationary longitudinal axis. Most joint motions combine roll and glide.', tags: ['anatomy', 'kinesiology', 'high-yield'] },
          { q: 'State the convex-concave rules of arthrokinematics.', a: 'CONVEX-on-CONCAVE: the convex surface moves opposite the direction of bone movement (glides opposite the roll). CONCAVE-on-CONVEX: the concave surface moves in the SAME direction as the bone (glides in the same direction). Critical for joint mobilization in rehab.', tags: ['anatomy', 'kinesiology', 'high-yield'] },
          { q: 'Define degrees of freedom (DOF) in joint mechanics.', a: 'The number of independent directions a joint can move. 1 DOF: hinge joints (elbow, knee — flex/extend). 2 DOF: condyloid (wrist) and saddle (thumb CMC). 3 DOF: ball-and-socket joints (hip, shoulder — flex/extend, abd/add, internal/external rotation).', tags: ['anatomy', 'kinesiology', 'high-yield'] },
          { q: 'Distinguish close-packed and loose-packed joint positions.', a: 'Close-packed: joint surfaces have maximum congruency, ligaments taut, joint locked, most stable but most vulnerable to injury under load (knee in full extension). Loose-packed: surfaces are incongruent, joint has play, ligaments relaxed — most mobile position (knee at ~25° flexion).', tags: ['anatomy', 'kinesiology', 'high-yield'] },
          { q: 'What are the three types of muscle fibers based on architecture?', a: 'Parallel: fibers run parallel to the long axis (rectus abdominis, sartorius). Fusiform: spindle-shaped with central belly (biceps brachii). Pennate: fibers angle into a central tendon — unipennate (extensor digitorum longus), bipennate (rectus femoris), multipennate (deltoid). Pennate arrangement increases force at the cost of velocity.', tags: ['anatomy', 'kinesiology', 'high-yield'] },
          { q: 'What is pennation angle and why does it matter?', a: 'The angle between muscle fibers and the line of force (tendon). Pennation increases physiological cross-sectional area (more fibers packed in) — increasing FORCE production. But angled fibers transmit less force to the tendon per unit fiber contraction (cosine of angle) and shorten less — reducing VELOCITY and excursion. Trade-off: pennate = stronger but slower.', tags: ['anatomy', 'kinesiology', 'high-yield'] },
          { q: 'Define physiological cross-sectional area (PCSA).', a: 'The cross-sectional area perpendicular to the muscle fibers (not the muscle belly). Best single predictor of maximum force production. Pennate muscles have larger PCSA than parallel muscles of the same anatomical CSA because fibers are packed at angles. Force ∝ PCSA.', tags: ['anatomy', 'kinesiology'] },
          { q: 'Distinguish active and passive insufficiency.', a: 'Active insufficiency: a muscle cannot generate force when maximally shortened across all joints it crosses (e.g., finger flexors at full wrist + finger flexion). Passive insufficiency: the antagonist limits motion because it cannot stretch further (e.g., hamstrings limiting hip flexion with knee extended — the basis of the straight leg raise test).', tags: ['anatomy', 'kinesiology', 'high-yield'] },
          { q: 'What is force-couple action?', a: 'Two or more muscles pulling in different directions to produce a single coordinated joint movement. Classic example: scapulohumeral rhythm — upper trapezius pulls up, lower trapezius pulls down, serratus anterior pulls forward, all together producing upward scapular rotation for arm elevation.', tags: ['anatomy', 'kinesiology', 'high-yield'] },
        ]
      },
      {
        id: 'shoulder-complex',
        title: 'Shoulder Complex',
        cards: [
          { q: 'Name the four joints of the shoulder complex.', a: 'Sternoclavicular (SC): only true joint connecting upper extremity to axial skeleton. Acromioclavicular (AC): between acromion and clavicle. Scapulothoracic (ST): not a true joint — scapula gliding on thorax. Glenohumeral (GH): the ball-and-socket between humeral head and glenoid. All four must coordinate for full ROM.', tags: ['anatomy', 'shoulder', 'high-yield'] },
          { q: 'Describe scapulohumeral rhythm.', a: 'For every 3° of arm elevation, ~2° occurs at the GH joint and ~1° at the ST joint (the classic 2:1 ratio, though varies through ROM). Without scapular upward rotation, the humerus would impinge against the acromion well before 180° elevation. Scapular stability is critical for shoulder function.', tags: ['anatomy', 'shoulder', 'high-yield'] },
          { q: 'Name the four rotator cuff muscles and their actions (SITS).', a: 'Supraspinatus: initiates abduction, stabilizes humeral head in glenoid. Infraspinatus: external rotation, posterior stabilizer. Teres minor: external rotation, lateral stabilizer. Subscapularis: internal rotation, anterior stabilizer. Together they create dynamic stability — keeping the humeral head centered during deltoid-driven elevation.', tags: ['anatomy', 'shoulder', 'high-yield', 'foundational'] },
          { q: 'What is subacromial impingement?', a: 'Compression of the supraspinatus tendon, subacromial bursa, and/or long head of biceps between the humeral head and the coracoacromial arch during elevation. Causes: poor scapular control, weak rotator cuff, capsular tightness, posture (forward head/rounded shoulders), bony spurs. Most common shoulder pathology.', tags: ['anatomy', 'shoulder', 'injury', 'high-yield'] },
          { q: 'Why is the long head of biceps clinically important?', a: 'Originates at the supraglenoid tubercle, passes through the bicipital groove, and contributes to glenohumeral stability. Vulnerable to inflammation (biceps tendinitis) and rupture. Often involved in superior labral (SLAP) tears.', tags: ['anatomy', 'shoulder'] },
          { q: 'What are the primary scapular stabilizers?', a: 'Upper trapezius (elevation, upward rotation). Middle trapezius (retraction). Lower trapezius (depression, upward rotation). Rhomboids (retraction, downward rotation). Serratus anterior (protraction, upward rotation — anti-winging). Levator scapulae (elevation, downward rotation). Weak/inhibited lower trap and serratus are common dysfunction patterns.', tags: ['anatomy', 'shoulder', 'high-yield'] },
          { q: 'What is scapular winging?', a: 'Medial border of the scapula protrudes posteriorly. Indicates weakness of the serratus anterior (long thoracic nerve injury causes classic winging) or other stabilizers. Visible when doing wall push-ups or arm elevation. A red flag for shoulder pathology and a target for prehab.', tags: ['anatomy', 'shoulder'] },
        ]
      },
      {
        id: 'hip-knee',
        title: 'Hip & Knee',
        cards: [
          { q: 'Why is the hip the most stable major joint?', a: 'Deep ball-and-socket geometry (acetabulum surrounds femoral head). Strong fibrous capsule reinforced by powerful ligaments (iliofemoral, pubofemoral, ischiofemoral — the Y ligament of Bigelow being strongest in body). Surrounded by massive musculature. Trade-off: less ROM than the shoulder, but vastly more stable.', tags: ['anatomy', 'hip', 'high-yield'] },
          { q: 'Name the hip flexors in order of significance.', a: 'Iliopsoas (combined iliacus + psoas major — primary hip flexor). Rectus femoris (also extends knee — biarticular). Sartorius (also flexes knee, externally rotates hip). Tensor fasciae latae. Pectineus. Adductor longus (assists flexion <70°). Many roles overlap.', tags: ['anatomy', 'hip', 'high-yield'] },
          { q: 'What is the function of the gluteus maximus?', a: 'Hip extension (primary mover). Hip external rotation (upper fibers). Hip abduction (upper fibers via IT band). Decelerates hip flexion eccentrically. Contributes to sacroiliac and lumbar stability via the thoracolumbar fascia. Critical for sprinting, jumping, and squatting; common dysfunction.', tags: ['anatomy', 'hip', 'high-yield'] },
          { q: 'What is the role of the gluteus medius and minimus?', a: 'Primary hip abductors and pelvic stabilizers in single-leg stance. Anterior fibers contribute to internal rotation, posterior fibers to external rotation. Weakness causes Trendelenburg gait (pelvis drops to the unsupported side) and contributes to knee valgus, IT band syndrome, and LBP.', tags: ['anatomy', 'hip', 'high-yield'] },
          { q: 'What is the Q-angle and clinical relevance?', a: 'Quadriceps angle — measured from ASIS to midpoint of patella, then to tibial tuberosity. Normal: ~13° in men, ~18° in women (wider pelvis). Higher Q-angle increases lateral pull on patella, contributing to patellofemoral pain and ACL injury risk. Partly explains higher ACL injury rates in female athletes.', tags: ['anatomy', 'knee', 'high-yield'] },
          { q: 'Name the four ligaments of the knee and their actions.', a: 'ACL (anterior cruciate): prevents anterior tibial translation; primary restraint. PCL (posterior cruciate): prevents posterior tibial translation; strongest knee ligament. MCL (medial collateral): resists valgus stress. LCL (lateral collateral): resists varus stress. Each has specific testing maneuvers.', tags: ['anatomy', 'knee', 'high-yield', 'foundational'] },
          { q: 'What is the screw-home mechanism of the knee?', a: 'In the final ~30° of knee extension, the tibia externally rotates ~10° on the femur (or femur internally rotates on fixed tibia). Locks the knee in close-packed position for stability. The popliteus muscle "unlocks" the knee initiating flexion by reversing this rotation.', tags: ['anatomy', 'knee', 'high-yield'] },
          { q: 'What is the function of the menisci?', a: 'Two C-shaped fibrocartilage discs (medial more C-shaped, lateral more circular). Functions: shock absorption (transmit ~50% of compressive load), joint congruence, load distribution, secondary stability, nutrition of articular cartilage. Avascular in the inner two-thirds — limiting healing capacity.', tags: ['anatomy', 'knee', 'high-yield'] },
          { q: 'Why does the medial meniscus tear more often than the lateral?', a: 'The medial meniscus is firmly attached to the deep MCL and the joint capsule, restricting its mobility. The lateral meniscus is more mobile (not attached to LCL). When the knee rotates under load (planting and pivoting), the medial meniscus gets caught between femur and tibia — the classic "unhappy triad" with ACL and MCL.', tags: ['anatomy', 'knee', 'high-yield'] },
        ]
      },
      {
        id: 'spine-core',
        title: 'Spine & Core',
        cards: [
          { q: 'Name the four normal curves of the spine.', a: 'Cervical lordosis (forward concave — develops with head lifting in infancy). Thoracic kyphosis (forward convex — primary curve from birth). Lumbar lordosis (forward concave — develops with walking). Sacral kyphosis (primary curve). The curves give the spine its strength and shock absorption ability.', tags: ['anatomy', 'spine', 'high-yield'] },
          { q: 'What is the function of intervertebral discs?', a: 'Shock absorption (annulus fibrosus provides tensile strength, nucleus pulposus provides hydrostatic pressure). Distribute load across the vertebral endplates. Allow controlled motion between vertebrae. Avascular in adults (rely on diffusion via motion — hence "use it or lose it" applies). Degeneration begins in 20s.', tags: ['anatomy', 'spine', 'high-yield'] },
          { q: 'How does disc loading vary with posture (Nachemson)?', a: 'Classic intradiscal pressure measurements (relative to standing = 100%): supine ~25%, side-lying ~75%, standing 100%, standing forward bent ~150%, sitting upright ~140%, sitting forward bent ~185%, sitting forward bent holding 20 kg ~275%. Highest in seated forward flexion under load — why deadlifts emphasize neutral spine.', tags: ['anatomy', 'spine', 'high-yield'] },
          { q: 'Name the deep core stabilizers (the local system).', a: 'Transverse abdominis (TrA — deepest abdominal, hoops around the trunk like a corset). Multifidi (deepest spinal extensors, segmental control). Diaphragm (top of "intra-abdominal pressure" cylinder). Pelvic floor (bottom of cylinder). All co-activate for spinal stability before limb movement.', tags: ['anatomy', 'spine', 'core', 'high-yield', 'foundational'] },
          { q: 'Name the global (superficial) core muscles.', a: 'Rectus abdominis (six-pack — trunk flexion). External obliques (rotation/lateral flexion). Internal obliques (rotation/lateral flexion). Quadratus lumborum (lateral flexion, hip hiker). Erector spinae (extension). Latissimus dorsi (multiplanar contributor). These produce gross movement; local system stabilizes.', tags: ['anatomy', 'spine', 'core', 'high-yield'] },
          { q: 'What is intra-abdominal pressure (IAP) and how does it stabilize the spine?', a: 'Pressure inside the abdominal cavity created by coordinated contraction of diaphragm (top), TrA (front/sides), multifidi (back), and pelvic floor (bottom). Acts like a pressurized cylinder, transmitting load and protecting the spine. The mechanism behind the Valsalva maneuver and proper bracing in heavy lifts.', tags: ['anatomy', 'spine', 'high-yield'] },
          { q: 'What is the lumbar safe zone (McGill\'s concept)?', a: 'A small range of lumbar motion around neutral where the disc, ligaments, and facet joints share load optimally. Repeated flexion-extension cycles (especially under load) damage the disc and increase LBP risk. Stuart McGill\'s research underlies the modern emphasis on neutral spine and "spine-sparing" technique.', tags: ['anatomy', 'spine', 'high-yield'] },
          { q: 'What are McGill\'s "Big Three" core exercises?', a: 'Curl-up (modified — not full sit-up), side bridge (side plank variations), bird-dog (quadruped opposite arm/leg extension). Chosen because they provide high stability stimulus with relatively low spinal compressive load. Foundation of evidence-based LBP prevention and rehab programs.', tags: ['anatomy', 'core', 'high-yield'] },
        ]
      },
      {
        id: 'gait-locomotion',
        title: 'Gait & Locomotion',
        cards: [
          { q: 'Name the two main phases of the gait cycle.', a: 'Stance phase: foot in contact with ground (60% of cycle). Swing phase: foot in the air (40% of cycle). Stance subdivides into initial contact, loading response, midstance, terminal stance, and preswing. Swing into initial swing, midswing, and terminal swing.', tags: ['anatomy', 'gait', 'high-yield'] },
          { q: 'Distinguish walking from running.', a: 'Walking: double support phase (both feet on ground briefly) — never airborne. Stance is ~60% of cycle. Running: flight phase (both feet airborne) — never double support. Stance shrinks to ~40% of cycle and decreases further with speed. Energy use differs dramatically.', tags: ['anatomy', 'gait', 'high-yield'] },
          { q: 'What is the inverted pendulum model of walking?', a: 'Walking economy: the body\'s center of mass arcs over a relatively straight stance leg like an inverted pendulum, exchanging potential and kinetic energy. Efficient at preferred walking speeds. Breaks down at faster speeds — leading to the walk-run transition (~2 m/s).', tags: ['anatomy', 'gait'] },
          { q: 'What is the spring-mass model of running?', a: 'During running, the body acts like a bouncing ball — the leg compresses (spring loading via tendon and muscle elasticity) at footstrike, then rebounds. Stored elastic energy returns ~50% of step energy. The Achilles tendon alone returns ~35% of energy from each running step.', tags: ['anatomy', 'gait', 'high-yield'] },
          { q: 'What is Trendelenburg gait?', a: 'Pelvis drops on the unsupported side during single-leg stance, indicating gluteus medius weakness (ipsilateral, on the stance leg side). Often seen in hip OA, post-hip surgery, or chronic gluteal dysfunction. Compensated Trendelenburg: trunk leans toward the stance leg to shift COM over the hip.', tags: ['anatomy', 'gait', 'high-yield'] },
          { q: 'What is antalgic gait?', a: 'Limp resulting from pain. Stance time is shortened on the painful limb (the athlete spends as little time as possible on the painful side). Common pattern after lower extremity injury. A clinical sign to recognize, document, and address.', tags: ['anatomy', 'gait'] },
          { q: 'What is the role of the foot arches?', a: 'Medial longitudinal arch (largest — supports body weight, shock absorption). Lateral longitudinal arch (smaller). Transverse arch (across forefoot — distributes load). The "windlass mechanism" tightens the plantar fascia as the toes extend, raising the arch and storing elastic energy for push-off.', tags: ['anatomy', 'foot', 'high-yield'] },
        ]
      },
    ]
  },
  phase11: {
    id: 'phase11',
    title: 'Phase XI — Motor Control & Neuroscience',
    subtitle: 'How the nervous system organizes movement',
    color: '#7209B7',
    icon: 'Brain',
    description: 'Based on Schmidt & Lee\'s Motor Control and Learning (6th ed.) and Magill\'s Motor Learning and Control — standard graduate texts. Goes beyond CSCS into the neuroscience underlying skill acquisition.',
    domains: [
      {
        id: 'nervous-system',
        title: 'Nervous System Organization',
        cards: [
          { q: 'Distinguish the central and peripheral nervous systems.', a: 'CNS: brain and spinal cord — integration and command. PNS: cranial and spinal nerves — sensory input to CNS and motor output to muscles/organs. PNS splits into somatic (voluntary motor and sensory) and autonomic (involuntary visceral control — sympathetic and parasympathetic).', tags: ['neuroscience', 'high-yield', 'foundational'] },
          { q: 'What are the primary motor areas of the brain?', a: 'Primary motor cortex (M1, precentral gyrus): generates voluntary movement signals. Premotor cortex: plans complex movement sequences. Supplementary motor area (SMA): plans internally generated movements. Cerebellum: motor learning, coordination, timing, error correction. Basal ganglia: movement initiation, force scaling, habit learning. All work together.', tags: ['neuroscience', 'high-yield'] },
          { q: 'Describe the function of the cerebellum.', a: 'Coordinates movement, refines timing and force scaling, integrates sensory feedback with motor commands, stores motor learning. Damage produces ataxia (uncoordinated movement), dysmetria (over/undershooting targets), intention tremor, and impaired motor learning. Critical for skill acquisition.', tags: ['neuroscience', 'high-yield'] },
          { q: 'What is the role of the basal ganglia?', a: 'Subcortical structures including caudate, putamen, globus pallidus. Filter and select motor programs, regulate force production, and store procedural (habit) learning. Damage causes movement disorders: Parkinson\'s (hypokinetic — too little movement) or Huntington\'s (hyperkinetic — too much).', tags: ['neuroscience'] },
          { q: 'Distinguish alpha and gamma motor neurons.', a: 'Alpha motor neurons: innervate skeletal muscle fibers (extrafusal fibers) — produce force. Gamma motor neurons: innervate intrafusal fibers within muscle spindles — adjust spindle sensitivity. They co-activate so the spindle stays sensitive throughout the range of muscle length changes.', tags: ['neuroscience', 'high-yield'] },
          { q: 'What is the difference between fast and slow nerve conduction?', a: 'Myelinated, large-diameter axons (alpha motor neurons, Ia sensory): conduct fast (60-100+ m/s). Small unmyelinated axons (gamma motor neurons, pain afferents): slow (<2 m/s). Myelination enables saltatory conduction — APs jump between Nodes of Ranvier. Demyelination diseases (MS) slow conduction dramatically.', tags: ['neuroscience'] },
          { q: 'What is reciprocal innervation?', a: 'When an agonist muscle is activated, its antagonist is reflexively inhibited via spinal interneurons. Allows smooth, unopposed joint motion. The neural basis of reciprocal inhibition during PNF stretching (contracting antagonist to relax target muscle).', tags: ['neuroscience', 'high-yield'] },
        ]
      },
      {
        id: 'reflexes-proprioception',
        title: 'Reflexes & Proprioception',
        cards: [
          { q: 'What is a reflex arc?', a: 'A neural pathway controlling a reflex action. Components: receptor → afferent (sensory) neuron → integrating center (spinal cord/brain) → efferent (motor) neuron → effector (muscle). Monosynaptic reflexes (one synapse) are fast; polysynaptic involve interneurons and more processing.', tags: ['neuroscience', 'reflexes', 'high-yield'] },
          { q: 'Describe the stretch (myotatic) reflex.', a: 'Sudden muscle stretch activates muscle spindle Ia afferents → directly synapse on alpha motor neurons of the same muscle → muscle contracts to resist stretch. Monosynaptic. Example: patellar tendon tap (knee jerk). Underlies ballistic stretching cautions and contributes to the stretch-shortening cycle.', tags: ['neuroscience', 'reflexes', 'high-yield', 'foundational'] },
          { q: 'Describe the inverse stretch (Golgi tendon) reflex.', a: 'Excessive tension at the musculotendinous junction activates Golgi tendon organs (GTOs) → Ib afferents → inhibitory interneurons → inhibit alpha motor neurons of the same muscle → muscle relaxes. Protective mechanism against tendon rupture. The basis of autogenic inhibition in PNF stretching.', tags: ['neuroscience', 'reflexes', 'high-yield'] },
          { q: 'What is the flexor (withdrawal) reflex?', a: 'Painful stimulus (stepping on a nail) → activation of flexors and inhibition of extensors in the same limb to withdraw from the stimulus. Crossed extensor reflex simultaneously extends the contralateral limb to support body weight. Polysynaptic, protective.', tags: ['neuroscience', 'reflexes'] },
          { q: 'Name the four primary proprioceptors.', a: 'Muscle spindles (within muscle bellies — detect length and velocity of stretch). Golgi tendon organs (musculotendinous junction — detect tension). Joint receptors (Ruffini endings, Pacinian corpuscles, free nerve endings in joint capsules — detect position, pressure, and pain). Vestibular receptors (inner ear — head position).', tags: ['neuroscience', 'reflexes', 'high-yield'] },
          { q: 'What does the vestibular system contribute to movement?', a: 'Inner ear structures (semicircular canals detect rotation; otoliths detect linear acceleration and gravity). Integrates with vision and proprioception for balance and orientation. Damage causes vertigo, balance deficits, and motion sickness. Trains athletes to maintain balance under perturbation.', tags: ['neuroscience'] },
          { q: 'What is the difference between conscious and unconscious proprioception?', a: 'Conscious proprioception: athlete can verbally describe joint position with eyes closed. Pathway: dorsal column-medial lemniscal → thalamus → primary somatosensory cortex. Unconscious proprioception: feeds automatic motor control. Pathway: spinocerebellar tracts → cerebellum. Both can be impaired by injury; both need rehabilitation.', tags: ['neuroscience'] },
          { q: 'How does joint injury affect proprioception?', a: 'Joint injury damages mechanoreceptors and disrupts afferent signaling. Proprioceptive deficits persist long after structural healing — a major reinjury risk factor. Targeted balance and perturbation training (single-leg stand, BOSU, unstable surfaces) restores proprioceptive function and reduces reinjury.', tags: ['neuroscience', 'rehab', 'high-yield'] },
        ]
      },
      {
        id: 'motor-control-theories',
        title: 'Motor Control Theories',
        cards: [
          { q: 'Describe the open-loop vs closed-loop control models.', a: 'Open-loop: movement is preplanned and executed without ongoing feedback — fast, automatic (a baseball swing, a sprint stride). Closed-loop: movement uses real-time feedback to adjust — slower, more accurate (threading a needle, slow precision tracking). Most skilled movement combines both modes.', tags: ['motor-control', 'high-yield', 'foundational'] },
          { q: 'What is a motor program?', a: 'A neural representation of a movement pattern, stored and selected as a whole rather than constructed piece-by-piece. Generalized motor programs (GMP) — Schmidt\'s theory: a class of movements sharing invariant features (relative timing, force ratio, sequence) but varying in parameters (total duration, total force, muscle selection).', tags: ['motor-control', 'high-yield'] },
          { q: 'What are the invariant features of a generalized motor program?', a: 'Relative timing (proportions of phases stay constant even when speed varies). Relative force (proportions of force across muscles stay constant). Sequence/order of components. These features make a "writing your name" big or small still recognizably YOUR signature.', tags: ['motor-control', 'high-yield'] },
          { q: 'What are the variable parameters of a generalized motor program?', a: 'Overall duration (you can speed it up or slow it down). Overall force (you can do it loud or soft). Muscle selection (you can write with your dominant or non-dominant hand). The motor program adapts these parameters to task demands without re-learning the underlying pattern.', tags: ['motor-control'] },
          { q: 'What is the degrees of freedom problem (Bernstein\'s problem)?', a: 'Nikolai Bernstein\'s observation: the body has vastly more degrees of freedom (joints, muscles, motor units) than would be needed to control a movement. How does the CNS coordinate so many components in real time? Bernstein proposed motor learning involves progressively releasing and exploiting degrees of freedom — moving from rigid to fluid expert performance.', tags: ['motor-control', 'high-yield'] },
          { q: 'Describe the three stages of motor learning (Bernstein perspective).', a: 'Stage 1: Freezing degrees of freedom — beginner reduces complexity by locking joints (e.g., novice golfer with stiff arms). Stage 2: Releasing degrees of freedom — joints unlock, more fluid. Stage 3: Exploiting degrees of freedom — using elasticity, momentum, environmental forces (an expert\'s effortless swing). Complements the Fitts & Posner cognitive-associative-autonomous model.', tags: ['motor-control', 'high-yield'] },
          { q: 'What is the schema theory of motor learning?', a: 'Schmidt\'s theory: with each motor execution, the learner stores four pieces of info — initial conditions, response parameters, outcomes, and sensory feedback. Over many practice trials, a "schema" forms — a rule relating these. Random/variable practice strengthens the schema; blocked practice weakens it. Underlies modern variable-practice methods.', tags: ['motor-control'] },
          { q: 'What is dynamical systems theory of motor control?', a: 'Alternative to motor programs: movement emerges from interaction of three constraints — organismic (the body), environmental, and task. Coordination patterns self-organize from these constraints. Newell\'s model. Implications: don\'t over-cue; manipulate constraints (drill design) to elicit desired patterns.', tags: ['motor-control'] },
        ]
      },
      {
        id: 'learning-feedback',
        title: 'Skill Acquisition & Feedback',
        cards: [
          { q: 'Distinguish performance from learning (Schmidt).', a: 'Performance: temporary expression of skill during practice (observable). Learning: relatively permanent change in capability (inferred from retention/transfer tests). Many manipulations BOOST short-term performance but HURT learning (immediate continuous feedback, blocked practice). Coach for learning, not for practice-day performance.', tags: ['motor-learning', 'high-yield', 'foundational'] },
          { q: 'Explain the contextual interference effect.', a: 'During acquisition, blocked practice (AAA BBB CCC) outperforms random practice (ABC BAC CAB). But on retention/transfer tests, random practice produces SUPERIOR learning. Counter-intuitive but well-replicated (Shea & Morgan, 1979). High contextual interference creates more elaborate processing — slower acquisition, deeper learning.', tags: ['motor-learning', 'high-yield', 'foundational'] },
          { q: 'What is the constant vs variable practice distinction?', a: 'Constant practice: same parameters every rep (always 10-foot free throws). Variable practice: parameters vary (free throws from 8, 10, 12 feet). Variable practice strengthens the schema and improves novel-condition transfer. Variable should follow constant after initial pattern acquisition.', tags: ['motor-learning', 'high-yield'] },
          { q: 'Distinguish knowledge of results (KR) from knowledge of performance (KP).', a: 'KR: feedback on the OUTCOME ("you missed by 3 inches left"). KP: feedback on the MOVEMENT QUALITY ("your release point was too low"). KR drives outcome-oriented motivation. KP is more useful for technique acquisition. Both contribute to learning when used appropriately.', tags: ['motor-learning', 'high-yield', 'foundational'] },
          { q: 'What is faded feedback?', a: 'Gradually reducing feedback frequency as learning progresses. High-frequency feedback (every trial) aids early acquisition but creates dependency that hurts retention. Faded feedback (every other trial, then every third, etc.) prevents this and improves long-term learning. The opposite of intuition: less feedback = more learning, eventually.', tags: ['motor-learning', 'high-yield'] },
          { q: 'What is bandwidth feedback?', a: 'Feedback given only when performance falls OUTSIDE a predefined acceptable range. As skill improves, bandwidth can narrow. Reduces unnecessary cueing (which can disrupt successful patterns) while providing correction when needed. A self-regulating system.', tags: ['motor-learning'] },
          { q: 'What is summary feedback?', a: 'Feedback delivered after a SET of trials rather than after each one. Example: after 10 sprints, the coach reviews data from all 10. Promotes the learner\'s own intrinsic error detection and self-evaluation. Generally produces better long-term retention than trial-by-trial KR.', tags: ['motor-learning'] },
          { q: 'What is the role of attentional focus in skill execution?', a: 'External focus (on movement OUTCOME — "drive the ball forward") generally outperforms internal focus (on BODY parts — "extend your knee"). Wulf et al. body of research. External focus allows automatic motor control to run; internal focus interferes with it. Especially important for skilled athletes.', tags: ['motor-learning', 'high-yield'] },
          { q: 'Distinguish discrete, continuous, and serial skills.', a: 'Discrete: clear beginning and end (kicking a ball, a single throw). Continuous: cyclical, no clear endpoint (running, swimming, cycling). Serial: a series of discrete actions performed in order (gymnastics routine, Olympic lift sequence). Each requires different practice and feedback strategies.', tags: ['motor-learning'] },
          { q: 'What is the difference between transfer and retention?', a: 'Retention: ability to perform after a delay with no further practice (test the original task days/weeks later). Transfer: ability to perform a RELATED but different task (cross-court forehand transfer to down-the-line forehand). Both are measures of true learning, not just performance.', tags: ['motor-learning'] },
        ]
      },
    ]
  },
  phase12: {
    id: 'phase12',
    title: 'Phase XII — Research Methods & Evidence',
    subtitle: 'Reading research, evaluating evidence, statistical literacy',
    color: '#3A86FF',
    icon: 'BarChart3',
    description: 'Based on Thomas, Nelson & Silverman\'s Research Methods in Physical Activity (8th ed.). Essential for graduate-level kinesiology and for becoming an evidence-based coach who reads primary literature.',
    domains: [
      {
        id: 'research-design',
        title: 'Research Design Fundamentals',
        cards: [
          { q: 'Distinguish the levels of evidence in sports science research.', a: '(1) Meta-analyses and systematic reviews (highest — synthesize many studies). (2) Randomized controlled trials (RCTs). (3) Cohort and case-control studies. (4) Cross-sectional and observational studies. (5) Case reports and case series. (6) Expert opinion and anecdote (lowest). Higher levels generally provide stronger causal inference.', tags: ['research', 'high-yield', 'foundational'] },
          { q: 'What is the difference between an RCT and a quasi-experimental design?', a: 'RCT: participants are RANDOMLY assigned to groups (experimental and control). Strongest design for causal inference because randomization controls for known and unknown confounders. Quasi-experimental: groups exist before the study (e.g., comparing two teams\' training programs). Cannot rule out pre-existing group differences.', tags: ['research', 'high-yield'] },
          { q: 'Define independent vs dependent variables.', a: 'Independent variable (IV): what the researcher MANIPULATES or CATEGORIZES (training program, sex, age group). Dependent variable (DV): what is MEASURED — the outcome (1RM, sprint time, VO2max). "Does the IV affect the DV?" is the basic research question.', tags: ['research', 'high-yield'] },
          { q: 'What is a confounding variable?', a: 'A third variable that influences both the IV and DV, creating a spurious appearance of causation. Example: people who supplement creatine also train harder — training, not creatine, may drive results. Controlled by randomization, matching, or statistical adjustment.', tags: ['research', 'high-yield'] },
          { q: 'Distinguish internal validity from external validity.', a: 'Internal validity: confidence that the IV CAUSED the change in DV in this study (no confounders, good control). External validity: confidence that results GENERALIZE to other populations, settings, times. Often a trade-off: tightly controlled lab studies have high internal but low external validity.', tags: ['research', 'high-yield', 'foundational'] },
          { q: 'Define reliability and validity in measurement.', a: 'Reliability: consistency of a measurement across repeated trials (intra-rater, inter-rater, test-retest). Validity: the measurement actually captures what it claims to. A scale can be reliable (consistently reads 5 lbs heavy) without being valid. Both required for useful research data.', tags: ['research', 'high-yield', 'foundational'] },
          { q: 'What is a placebo effect, and how is it controlled?', a: 'Placebo effect: improvement attributable to the participant\'s BELIEF about the intervention, not the intervention itself. Controlled via placebo groups (inert "treatment"), single-blinding (participants don\'t know which group they\'re in), or double-blinding (neither participants nor researchers know).', tags: ['research', 'high-yield'] },
          { q: 'What is the Hawthorne effect?', a: 'Participants change behavior simply because they know they\'re being observed/studied. A threat to external validity. Example: athletes train harder during a study than they normally would. Minimized by extending data collection so participants habituate, or using non-obtrusive monitoring.', tags: ['research'] },
        ]
      },
      {
        id: 'statistics-basics',
        title: 'Statistical Concepts',
        cards: [
          { q: 'Distinguish descriptive from inferential statistics.', a: 'Descriptive: SUMMARIZE the sample (means, SDs, ranges, frequencies). Inferential: use the sample to draw conclusions about a larger POPULATION (t-tests, ANOVA, regression). Descriptive describes what IS; inferential estimates what is LIKELY TRUE in general.', tags: ['research', 'statistics', 'high-yield', 'foundational'] },
          { q: 'What are the four scales of measurement?', a: 'Nominal: categories with no order (sport position, sex). Ordinal: ranked but unequal intervals (1st, 2nd, 3rd; Likert scales). Interval: equal intervals, no true zero (temperature in Celsius). Ratio: equal intervals AND true zero (weight, distance, time). Each requires different statistical tests.', tags: ['research', 'statistics', 'high-yield'] },
          { q: 'Define mean, median, and mode.', a: 'Mean: arithmetic average — sensitive to outliers. Median: middle value when ordered — robust to outliers. Mode: most frequent value. For normally distributed data, all three are similar. For skewed data, the mean is pulled toward the skew and may misrepresent the typical case.', tags: ['research', 'statistics', 'high-yield'] },
          { q: 'What is standard deviation (SD)?', a: 'A measure of variability — average distance of scores from the mean. Larger SD = more spread. In normal distributions: ~68% of scores fall within ±1 SD of the mean, ~95% within ±2 SD, ~99.7% within ±3 SD. Used to assess how "typical" an individual score is.', tags: ['research', 'statistics', 'high-yield', 'foundational'] },
          { q: 'What is the difference between SD and standard error (SE)?', a: 'SD: variability within a sample (how spread out individual scores are). SE = SD/√n: the precision of the SAMPLE MEAN as an estimate of the population mean. SE decreases as sample size grows, even if SD stays constant. Larger samples yield more precise estimates.', tags: ['research', 'statistics', 'high-yield'] },
          { q: 'Define a null hypothesis.', a: 'A statement of no effect or no difference — what we try to disprove. Example: "There is no difference in 1RM gains between Program A and Program B." Statistical tests calculate the probability of observing the data IF the null is true. Low probability (p < 0.05) leads us to REJECT the null.', tags: ['research', 'statistics', 'high-yield'] },
          { q: 'What is a p-value?', a: 'The probability of observing data AS EXTREME OR MORE EXTREME than what was observed, IF the null hypothesis is true. p < 0.05 (5% chance under null) is the conventional cutoff for "statistical significance." A p-value does NOT mean "5% chance the result is false" — common misinterpretation.', tags: ['research', 'statistics', 'high-yield', 'foundational'] },
          { q: 'What is Type I vs Type II error?', a: 'Type I (alpha): rejecting a true null hypothesis — a false positive. Conventionally set at α = 0.05. Type II (beta): failing to reject a false null — a false negative. Statistical power = 1 - β (typically aimed at 0.80). Both error types must be balanced; reducing one increases the other.', tags: ['research', 'statistics', 'high-yield'] },
          { q: 'What is effect size?', a: 'A standardized measure of the MAGNITUDE of an effect, independent of sample size. Cohen\'s d: 0.2 small, 0.5 medium, 0.8 large. A statistically significant result with small effect size may have no practical importance. Always look at effect size, not just p-value, when evaluating research.', tags: ['research', 'statistics', 'high-yield'] },
          { q: 'What is statistical power and how does sample size affect it?', a: 'Power: the probability of detecting a real effect if one exists (1 - β). Affected by sample size, effect size, and alpha level. Larger samples = more power. Underpowered studies (small n, small effect) often fail to detect real effects. A priori power analysis determines required sample size.', tags: ['research', 'statistics', 'high-yield'] },
        ]
      },
      {
        id: 'statistical-tests',
        title: 'Common Statistical Tests',
        cards: [
          { q: 'When is a t-test used?', a: 'To compare the means of two groups. Independent samples t-test: two separate groups (treatment vs control). Paired samples t-test: same participants measured twice (pre vs post). Requires roughly normal distributions and similar variances. Most common comparison test in sports research.', tags: ['research', 'statistics', 'high-yield'] },
          { q: 'When is ANOVA used?', a: 'Analysis of Variance — compares means across THREE OR MORE groups. One-way ANOVA: one IV with multiple levels (3 training programs). Two-way ANOVA: two IVs (program AND sex). Repeated-measures ANOVA: same participants measured at multiple time points. Significant ANOVA requires post-hoc tests (Tukey, Bonferroni) to identify which groups differ.', tags: ['research', 'statistics', 'high-yield'] },
          { q: 'What does a correlation coefficient (r) measure?', a: 'Strength and direction of LINEAR relationship between two variables. Ranges from -1 to +1. ±1: perfect linear relationship. 0: no linear relationship. r² (coefficient of determination): proportion of variance in Y explained by X. Correlation does NOT establish causation.', tags: ['research', 'statistics', 'high-yield', 'foundational'] },
          { q: 'Distinguish Pearson r from Spearman rho.', a: 'Pearson: for interval/ratio data, assumes normal distribution and linear relationship. Spearman: rank-order correlation, works for ordinal data or non-linear relationships, more robust to outliers. Use Spearman when data violate normality assumptions.', tags: ['research', 'statistics'] },
          { q: 'What is regression analysis?', a: 'Models the relationship between a DV and one or more IVs to make predictions. Simple linear regression: one predictor. Multiple regression: several predictors. Output: regression equation (Y = a + bX) and R² (variance explained). Used to identify predictors of performance and to estimate values.', tags: ['research', 'statistics', 'high-yield'] },
          { q: 'When are non-parametric tests used?', a: 'When parametric assumptions are violated: non-normal distributions, ordinal data, very small samples. Common non-parametric alternatives: Mann-Whitney U (instead of independent t-test), Wilcoxon signed-rank (instead of paired t-test), Kruskal-Wallis (instead of ANOVA), Spearman rho (instead of Pearson r). Less powerful when assumptions are met but more robust when they\'re not.', tags: ['research', 'statistics'] },
          { q: 'What is a chi-square test?', a: 'Tests for association between two CATEGORICAL variables. Example: does sport position (line vs skill) relate to injury type (acute vs overuse)? Compares observed frequencies to expected frequencies. The standard test for nominal/categorical data.', tags: ['research', 'statistics'] },
        ]
      },
      {
        id: 'reading-research',
        title: 'Reading & Evaluating Research',
        cards: [
          { q: 'What are the parts of a typical research article (IMRaD)?', a: 'Introduction (rationale, prior research, hypotheses). Methods (participants, procedures, statistics — replicability). Results (findings, statistics, figures). Discussion (interpretation, limitations, implications). Plus Abstract (summary) and References. Strong research has clearly defined hypotheses tested with appropriate methods.', tags: ['research', 'high-yield'] },
          { q: 'What is peer review and why does it matter?', a: 'Other experts in the field critically evaluate a manuscript before publication. Filters out methodological flaws, unsupported conclusions, and outright errors. Peer-reviewed journals are more credible than non-reviewed sources. NOT a perfect filter — flawed studies still pass; this is why replication matters.', tags: ['research', 'high-yield'] },
          { q: 'How is journal quality typically assessed?', a: 'Impact factor (average citations per article over recent years — higher = more cited but field-dependent). Acceptance rate (lower = more selective). Reputation among researchers. SCImago and CiteScore are alternatives to JCR impact factor. Be skeptical of "predatory" journals that publish anything for a fee.', tags: ['research'] },
          { q: 'What is a systematic review vs a meta-analysis?', a: 'Systematic review: comprehensive search, predefined criteria, qualitative synthesis of all relevant studies. Meta-analysis: a systematic review that also performs STATISTICAL pooling — combining effect sizes across studies to produce an overall estimate. Meta-analyses are the highest level of single-publication evidence.', tags: ['research', 'high-yield'] },
          { q: 'What is publication bias?', a: 'The tendency for studies with statistically significant or "positive" results to be published more than null-result studies. Skews the published literature toward overestimating effects. Detected via funnel plots in meta-analyses. Mitigated by trial registration (registering hypotheses before data collection).', tags: ['research', 'high-yield'] },
          { q: 'What is a clinically meaningful vs statistically significant difference?', a: 'Statistical significance (p < 0.05): the difference is unlikely to be due to chance. Clinical/practical significance: the difference is large enough to MATTER. A 0.1 lb 1RM increase may be statistically significant in a large study but clinically trivial. Effect size and minimal clinically important difference (MCID) gauge practical relevance.', tags: ['research', 'statistics', 'high-yield'] },
          { q: 'What is the difference between a primary, secondary, and tertiary source?', a: 'Primary: the original research report (peer-reviewed journal article). Secondary: a review, textbook, or article describing primary research. Tertiary: a synthesis of secondary sources (encyclopedias, popular media). Practitioners should learn to read primary research; reliance on tertiary sources allows distortion to creep in.', tags: ['research', 'foundational'] },
          { q: 'What is a CONSORT diagram?', a: 'Standardized flow chart in clinical trial reporting showing how participants moved through the study: enrolled → randomized → received intervention → followed up → analyzed. Reveals dropouts, exclusions, and missing data — all critical to interpreting results. Required by major medical journals.', tags: ['research'] },
        ]
      },
      {
        id: 'evidence-based-practice',
        title: 'Evidence-Based Practice',
        cards: [
          { q: 'Define evidence-based practice (EBP).', a: 'Integration of (1) the best available research evidence, (2) clinician/coach expertise, and (3) the athlete\'s preferences, values, and context to make decisions. Originated in medicine (Sackett et al.). Not "evidence-only" practice — coach experience and athlete context matter too.', tags: ['research', 'evidence-based', 'high-yield', 'foundational'] },
          { q: 'What is the PICO framework for clinical questions?', a: 'A structure for searchable research questions. P: Population/Patient (collegiate sprinters). I: Intervention (plyometric training). C: Comparison (traditional resistance training only). O: Outcome (40-yard dash time). Forces specific, answerable questions and guides literature searches.', tags: ['research', 'evidence-based', 'high-yield'] },
          { q: 'How is research applied to an individual athlete?', a: 'Research describes AVERAGE effects across groups. Individuals vary widely. Use research as a starting framework, then individualize based on response, recovery, preference, and goals. Track individual data over time. Avoid both "evidence-free" practice AND robotic adherence to research without considering context.', tags: ['research', 'evidence-based'] },
          { q: 'What is responder vs non-responder analysis?', a: 'Group means hide individual variation. Within any "effective" training study, some individuals respond strongly, some modestly, and some not at all (or even negatively). Identifying who responds to what — and why — is one of the major directions in exercise science research and coaching practice.', tags: ['research', 'evidence-based', 'high-yield'] },
          { q: 'Why is replication important in research?', a: 'A single study can produce a result by chance or due to unrecognized methodological issues. Independent replication is the bedrock of reliable knowledge. The "replication crisis" in psychology revealed that many famous findings don\'t replicate. Sports science has similar concerns. Take single studies with caution; trust replicated findings.', tags: ['research', 'evidence-based'] },
          { q: 'What is the difference between association and causation?', a: 'Association: two variables change together (correlation). Causation: one variable CAUSES change in another. Causation requires: (1) temporal precedence (cause before effect), (2) association, (3) no plausible alternative explanations (confounders ruled out). Only randomized experiments can establish causation; observational studies show association.', tags: ['research', 'high-yield'] },
          { q: 'What are common red flags in sports science reporting?', a: 'Tiny sample sizes (<10). No control group. No statistical analysis or only p-values without effect sizes. Conclusions overreaching the data. Promotional or commercial conflicts of interest. Sample completely unlike your athlete (untrained males vs your trained female athletes). Single studies presented as definitive truth.', tags: ['research', 'evidence-based', 'high-yield'] },
          { q: 'How should a coach update their practice based on new research?', a: 'Don\'t flip with every new study. Look for: meta-analyses and systematic reviews, consistent replication, applicability to your population, and effect sizes large enough to matter practically. Build understanding of the evidence base over time. Be willing to change when evidence accumulates, but resist trend-chasing based on single studies.', tags: ['research', 'evidence-based', 'high-yield'] },
        ]
      },
    ]
  },
  phase13: {
    id: 'phase13',
    title: 'Phase XIII — Advanced Bioenergetics & Endocrinology',
    subtitle: 'Cellular metabolism and hormone cascades',
    color: '#06A77D',
    icon: 'Zap',
    description: 'Deep biochemistry of ATP production and the endocrine response to exercise. Powers & Howley and McArdle/Katch/Katch level depth. Critical for understanding WHY training works at the cellular level.',
    domains: [
      {
        id: 'glycolysis-detail',
        title: 'Glycolysis & Substrate-Level Phosphorylation',
        cards: [
          { q: 'Where does glycolysis occur in the cell?', a: 'In the cytoplasm (cytosol) — outside the mitochondria. Does not require oxygen. Both aerobic and anaerobic metabolism begin here. The 10-step enzymatic pathway converts one molecule of glucose into two molecules of pyruvate.', tags: ['bioenergetics', 'metabolism', 'high-yield', 'foundational'] },
          { q: 'What is the net ATP yield of glycolysis?', a: 'Net 2 ATP per glucose (4 produced minus 2 invested in the early "priming" steps). Also produces 2 NADH and 2 pyruvate. The 2 ATP come from substrate-level phosphorylation. NADH and pyruvate then feed into aerobic pathways if oxygen is available.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'Distinguish glycolysis from glycogenolysis.', a: 'Glycolysis: starts with free glucose, costs 2 ATP in priming → net 2 ATP. Glycogenolysis: starts with glycogen-stored glucose, skips one priming step → net 3 ATP (one ATP saved). Why "primed" muscle glycogen is more efficient than blood glucose for anaerobic exercise.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'What happens to pyruvate after glycolysis?', a: 'With oxygen (aerobic): pyruvate enters mitochondria, is converted to acetyl-CoA by pyruvate dehydrogenase, and enters the Krebs cycle. Without sufficient oxygen (anaerobic): pyruvate accepts H⁺ from NADH and is converted to lactate by lactate dehydrogenase, regenerating NAD⁺ to keep glycolysis running.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'What is the role of NAD⁺/NADH in glycolysis?', a: 'NAD⁺ is the electron acceptor in glycolysis (step 6, glyceraldehyde-3-phosphate dehydrogenase). NAD⁺ is converted to NADH, carrying high-energy electrons. NAD⁺ MUST be regenerated for glycolysis to continue — either by NADH delivering electrons to the ETC (aerobic) or by lactate formation (anaerobic).', tags: ['bioenergetics', 'metabolism'] },
          { q: 'What is the rate-limiting enzyme of glycolysis?', a: 'Phosphofructokinase (PFK). Step 3 of glycolysis. Regulated allosterically by ATP (inhibits), AMP (activates), and citrate (inhibits). Heavily active during exercise when ATP is being rapidly used and AMP accumulates. The primary control point of carbohydrate energy flux.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'What is the Cori cycle?', a: 'Lactate produced in working muscle is transported via blood to the liver, where gluconeogenesis converts it back to glucose. Glucose can then be released back to the blood for muscle re-use. Net: lactate is not waste — it\'s a fuel shuttle. Provides ~10-20% of glucose during prolonged exercise.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'What is the lactate shuttle hypothesis?', a: 'Brooks\' hypothesis: lactate isn\'t a metabolic dead-end. It\'s actively shuttled from glycolytic fibers (producers) to oxidative fibers and other organs (consumers — heart, brain, liver). Lactate is a preferred fuel for the heart at rest. Reshapes the old "lactate = bad" view.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
        ]
      },
      {
        id: 'krebs-etc',
        title: 'Krebs Cycle & Electron Transport',
        cards: [
          { q: 'Where does the Krebs (citric acid / TCA) cycle occur?', a: 'In the mitochondrial matrix — inside the mitochondria. Requires oxygen indirectly (the ETC, which receives electrons from the Krebs cycle, needs oxygen). 8 enzymatic steps per turn; 2 turns per glucose molecule (since glucose → 2 pyruvate → 2 acetyl-CoA).', tags: ['bioenergetics', 'metabolism', 'high-yield', 'foundational'] },
          { q: 'What does one turn of the Krebs cycle produce?', a: 'Per turn: 3 NADH, 1 FADH₂, 1 GTP (≈1 ATP via substrate-level phosphorylation), and 2 CO₂ released. Per glucose (2 turns): 6 NADH, 2 FADH₂, 2 ATP, 4 CO₂. The NADH and FADH₂ then carry electrons to the ETC for massive ATP production.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'What is the role of acetyl-CoA?', a: 'The central entry point to the Krebs cycle. Comes from carbohydrates (via pyruvate), fats (via beta-oxidation), or amino acids. "All roads lead to acetyl-CoA" — explains why all macronutrients can be oxidized for energy. Each acetyl-CoA = one Krebs cycle turn.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'Where does the electron transport chain (ETC) take place?', a: 'On the inner mitochondrial membrane (folded into cristae for increased surface area). Four protein complexes (I-IV) plus ATP synthase. Electrons from NADH and FADH₂ are passed down through the complexes, with the final electron acceptor being oxygen — forming water.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'How does the ETC produce ATP (oxidative phosphorylation)?', a: 'Electrons flowing through Complexes I, III, IV pump protons (H⁺) from the matrix to the intermembrane space, creating an electrochemical gradient. Protons flow back through ATP synthase, driving rotation that catalyzes ADP + Pi → ATP. The chemiosmotic theory (Mitchell, 1961 Nobel Prize).', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'What is the ATP yield per glucose from oxidative phosphorylation?', a: 'Each NADH yields ~2.5 ATP, each FADH₂ ~1.5 ATP (modern values; older texts say 3 and 2). Total per glucose: 10 NADH × 2.5 + 2 FADH₂ × 1.5 = ~28 ATP from oxidative phosphorylation. Add 2 (glycolysis) + 2 (Krebs SLP) = ~32 ATP total per glucose (older texts: 36-38).', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'Why is oxygen called the "final electron acceptor"?', a: 'At Complex IV (cytochrome c oxidase), electrons combine with O₂ and 4 H⁺ to form 2 H₂O. Without oxygen, electrons back up through the ETC, NAD⁺ can\'t be regenerated, the Krebs cycle halts, and the cell must rely on glycolysis alone — the basis of anaerobic exercise limitations.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'What is beta-oxidation?', a: 'The process of breaking down fatty acids into acetyl-CoA. Occurs in the mitochondrial matrix. Each cycle of beta-oxidation shortens a fatty acid by 2 carbons (one acetyl-CoA produced) and yields 1 NADH and 1 FADH₂. A 16-carbon palmitate fully oxidized yields ~106 ATP — explaining fat\'s high caloric density.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'What is the difference between substrate-level and oxidative phosphorylation?', a: 'Substrate-level: direct transfer of a phosphate group from a high-energy intermediate to ADP (in glycolysis and the Krebs cycle). Produces a small amount of ATP quickly without requiring oxygen. Oxidative phosphorylation: ATP produced by ATP synthase driven by the proton gradient. Produces ~90% of total ATP but requires O₂.', tags: ['bioenergetics', 'metabolism'] },
        ]
      },
      {
        id: 'fuel-utilization',
        title: 'Fuel Selection & Metabolic Crossover',
        cards: [
          { q: 'What is the crossover concept?', a: 'Brooks & Mercier: as exercise intensity increases, fuel selection "crosses over" from primarily fat oxidation to primarily carbohydrate oxidation. At ~65% VO₂max, the contributions cross. Above that, carbs dominate. Below that, fats dominate. Training shifts the curve — endurance training spares carbs by using more fat at the same absolute intensity.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'What is the respiratory exchange ratio (RER)?', a: 'RER = CO₂ produced / O₂ consumed. RER = 0.7 = pure fat oxidation. RER = 1.0 = pure carbohydrate oxidation. RER > 1.0 = anaerobic contribution (excess CO₂ from buffering H⁺). Used in indirect calorimetry to estimate fuel mix during exercise.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'How much energy is stored in different fuel sources?', a: 'ATP: ~85 g in body (used in seconds). Creatine phosphate: ~120 g. Muscle glycogen: ~400-500 g (~1600-2000 kcal). Liver glycogen: ~100 g (~400 kcal). Adipose fat: 10-20+ kg in lean individuals (~80,000-160,000 kcal). Protein: 6-10 kg, but normally not used as primary fuel.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'What is "hitting the wall" in endurance sports?', a: 'Glycogen depletion. After ~90-120 min of high-intensity endurance exercise, muscle glycogen runs critically low. The athlete is forced to rely on fat oxidation, which can\'t produce ATP fast enough to maintain pace. Performance drops dramatically. Mitigated by carbohydrate intake during exercise (30-90 g/hr) and prior glycogen loading.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'What is EPOC (Excess Post-Exercise Oxygen Consumption)?', a: 'Elevated oxygen consumption AFTER exercise ends, used to restore homeostasis: replenish ATP and CP, clear lactate, restore O₂ stores, repay oxygen deficit, restore body temperature, and elevated breathing/HR. Higher with higher intensities. Mistakenly called "oxygen debt" historically. Modest contribution to total caloric burn (~6-15%).', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'What is the lactate threshold (LT)?', a: 'The exercise intensity at which blood lactate begins to accumulate above baseline — typically around 4 mmol/L (OBLA — onset of blood lactate accumulation) or +1 mmol/L above resting (LT1). Reflects the point where lactate production exceeds clearance. Better predictor of endurance performance than VO₂max for elite athletes.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
          { q: 'How does endurance training shift the lactate threshold?', a: 'Increases mitochondrial density and oxidative enzymes → more lactate is cleared → LT shifts to higher intensities (right). An elite endurance athlete may sustain 85-90% of VO₂max at LT, while an untrained person may have LT at 50-60% VO₂max. Training-induced shifts in LT correlate strongly with performance improvements.', tags: ['bioenergetics', 'metabolism', 'high-yield'] },
        ]
      },
      {
        id: 'hormone-cascade',
        title: 'Endocrine Response to Exercise',
        cards: [
          { q: 'What is the acute vs chronic hormonal response to resistance training?', a: 'Acute: transient elevations in testosterone, GH, IGF-1, cortisol, catecholamines lasting 15-30 min post-workout. Critical for tissue growth and remodeling. Chronic: resting hormone concentrations often DON\'T change much despite hypertrophy and strength gains. Suggests acute exposure to anabolic hormones drives chronic adaptations.', tags: ['endocrine', 'high-yield', 'foundational'] },
          { q: 'What protocol maximizes the acute anabolic hormonal response?', a: 'High volume, moderate-to-high intensity (70-85% 1RM), short rest intervals (30-90 sec), large muscle mass involvement (squats, deadlifts, presses), multi-joint compound movements. Hypertrophy-style training produces the largest GH and testosterone spikes; pure strength training (heavy, long rests) less so.', tags: ['endocrine', 'high-yield'] },
          { q: 'How does testosterone affect muscle?', a: 'Testosterone binds to androgen receptors (ARs) in muscle and other tissues. Increases muscle protein synthesis, decreases breakdown, increases satellite cell activity, supports the development of fast-twitch fibers. Acute exercise-induced testosterone spikes correlate with hypertrophy in some studies but not all — the relationship is more complex than once believed.', tags: ['endocrine', 'high-yield'] },
          { q: 'What is the growth hormone (GH) superfamily?', a: 'Not a single molecule — over 100 isoforms of GH circulate. The 22-kDa "main" isoform is what most assays measure. GH is pulsatile (released in bursts) — strongest pulse during slow-wave sleep. Resistance exercise elicits substantial acute increases lasting ~30 min. Effects include lipolysis, IGF-1 production (in liver), and connective tissue remodeling.', tags: ['endocrine', 'high-yield'] },
          { q: 'What is IGF-1 and its role?', a: 'Insulin-like Growth Factor 1. Produced in the liver in response to GH (systemic IGF-1) and in muscle locally during mechanical loading (mechano-growth factor, MGF). Drives muscle protein synthesis, satellite cell activation, and tissue repair. Elevated 3-9 hours post-resistance exercise.', tags: ['endocrine', 'high-yield'] },
          { q: 'What is the role of cortisol in exercise?', a: 'Glucocorticoid released from adrenal cortex via HPA axis. Catabolic — promotes proteolysis, gluconeogenesis, lipolysis. Acute cortisol elevation post-exercise reflects metabolic demand and is NORMAL (not always "bad"). Chronic elevated cortisol (overtraining, severe stress) is catabolic and impairs adaptation and immune function.', tags: ['endocrine', 'high-yield'] },
          { q: 'What is the testosterone-to-cortisol ratio (T:C)?', a: 'A marker of anabolic/catabolic balance. A sustained drop in T:C ratio (≥30% reduction) has been used as an indicator of overtraining or non-functional overreaching. Limited individual variability and circadian rhythm complicate interpretation — useful as a trend with serial measurements, not a single snapshot.', tags: ['endocrine', 'overtraining', 'high-yield'] },
          { q: 'How do catecholamines (epinephrine, norepinephrine) respond to exercise?', a: 'Acute increases proportional to intensity. Effects: increase HR and contractility, mobilize fuel (lipolysis, glycogenolysis), shunt blood to working muscles, dilate airways. Resting catecholamines may decrease with endurance training (lower resting HR). Critical for fight-or-flight and high-intensity performance.', tags: ['endocrine', 'high-yield'] },
          { q: 'What is the HPA axis?', a: 'Hypothalamus → CRH → anterior Pituitary → ACTH → Adrenal cortex → cortisol. The central stress response axis. Activated by physical exercise, psychological stress, and inflammation. Chronic over-activation leads to dysregulated cortisol patterns associated with overtraining syndrome, mood disorders, and metabolic dysfunction.', tags: ['endocrine', 'high-yield'] },
          { q: 'How does insulin act during and after exercise?', a: 'During exercise: blood insulin falls (allowing glucose mobilization). Muscle still takes up glucose via insulin-INDEPENDENT GLUT4 translocation triggered by contraction. After exercise: insulin sensitivity is dramatically elevated (the "exercise effect" on T2D) — small insulin spikes drive large glycogen replenishment. Why post-workout carbs replenish so efficiently.', tags: ['endocrine', 'high-yield'] },
        ]
      },
    ]
  },
  phase14: {
    id: 'phase14',
    title: 'Phase XIV — Exercise Technique Master Class',
    subtitle: 'The major lifts: setup, execution, errors, cues',
    color: '#F77F00',
    icon: 'Dumbbell',
    description: 'Lift-by-lift coaching detail — setup, execution, common errors, and cues. Built from the NSCA Exercise Technique Manual and CSCCa lift standards. Essential for the video-question portion of the Practical/Applied exam.',
    domains: [
      {
        id: 'back-squat',
        title: 'The Back Squat',
        cards: [
          { q: 'Describe the proper back squat setup.', a: 'Bar position: high-bar across the upper trapezius (not the neck) or low-bar across the rear deltoids. Hands: closed pronated grip slightly wider than shoulders, elbows down/back. Stance: ~shoulder-width, toes slightly turned out (10-30°). Feet flat. Chest up, neutral spine, brace core, take a breath at the top.', tags: ['technique', 'squat', 'high-yield', 'foundational'] },
          { q: 'What are the cues for the descent in the back squat?', a: '"Sit back AND down" (knees track over toes). Keep chest up. Maintain neutral spine. Drive knees out laterally to prevent valgus. Descend under control. Reach at minimum parallel — hip crease at or below the top of the knee. Don\'t collapse forward; the bar should travel vertically over mid-foot.', tags: ['technique', 'squat', 'high-yield'] },
          { q: 'What are the cues for the ascent in the back squat?', a: '"Drive the floor away" (external focus cue). Hips and chest rise together. Knees track over toes. Maintain neutral spine — don\'t let the chest collapse. Exhale through the hardest part (often just past parallel). Hips don\'t rise faster than the shoulders — that\'s a "good morning" fault.', tags: ['technique', 'squat', 'high-yield'] },
          { q: 'Name common back squat errors and corrections.', a: 'Heels rise → check ankle mobility, narrow stance, weightlifting shoes. Knee valgus → cue "knees out," strengthen glute med, work hip ER. Forward lean → strengthen core/quads, check ankle/hip mobility. Hips rise faster than shoulders → weak quads or excessive low-bar position; cue "chest up." Bar drift → cue "stay tight," shorten ROM until form solidifies.', tags: ['technique', 'squat', 'high-yield'] },
          { q: 'High-bar vs low-bar back squat — what\'s the difference?', a: 'High-bar: bar on upper traps, more upright torso, deeper depth, more quad-dominant, longer ROM. Lower-bar: bar on rear delts (~3 inches lower), more forward lean, shorter ROM, more posterior chain (glute/hamstring) recruitment, more weight liftable. Olympic lifters often prefer high-bar; powerlifters often prefer low-bar.', tags: ['technique', 'squat', 'high-yield'] },
        ]
      },
      {
        id: 'deadlift',
        title: 'The Deadlift',
        cards: [
          { q: 'Describe the conventional deadlift setup.', a: 'Stance: hip-width, toes slightly out, bar over mid-foot (~1 inch in front of shins). Grip: closed pronated or mixed/alternated grip, just outside legs, shoulder-width. Hips between knees and shoulders (lower than squat, higher than clean). Lats engaged ("squeeze oranges in armpits"), neutral spine, chest up, brace.', tags: ['technique', 'deadlift', 'high-yield', 'foundational'] },
          { q: 'What are the cues for the deadlift pull?', a: '"Push the floor away" first (driving with legs). Bar stays in contact with shins/thighs throughout. Hips and shoulders rise together — don\'t let hips shoot up first. Lockout at the top: hips fully extended, glutes squeezed, shoulders over hips, NOT leaning back / hyperextending.', tags: ['technique', 'deadlift', 'high-yield'] },
          { q: 'Distinguish conventional and sumo deadlifts.', a: 'Conventional: hip-width stance, grip outside knees, bar travels longer vertical distance, more low-back / hamstring demand. Sumo: very wide stance, grip inside knees, shorter ROM, more upright torso, more quad / hip adductor / glute med demand, less low-back stress. Athlete preference based on leverages and goals.', tags: ['technique', 'deadlift', 'high-yield'] },
          { q: 'Name common deadlift errors and corrections.', a: 'Rounded lower back → too much weight, weak core, OR limited hamstring flexibility; cue "chest up, lats tight." Hips shoot up first → weak quads or hips set too low; reset hip height. Bar drifts away from body → cue "lats squeeze," check hip starting position. Hyperextending at top → cue "stop when hips are stacked under shoulders." Soft knees → drive heels and lock out.', tags: ['technique', 'deadlift', 'high-yield'] },
          { q: 'What is a Romanian deadlift (RDL) and how does it differ from a conventional deadlift?', a: 'RDL: hip-hinge dominant, knees only slightly bent and stay relatively still throughout. Bar stays close to thighs as hips push BACK (not down). Bar descends to mid-shin or slightly lower based on hamstring flexibility, then drives back up. Primary movers: glutes and hamstrings. Conventional deadlift has more knee bend and starts from the floor.', tags: ['technique', 'deadlift', 'high-yield'] },
        ]
      },
      {
        id: 'bench-press',
        title: 'The Bench Press',
        cards: [
          { q: 'Describe proper bench press setup.', a: 'Five-point body contact: head, upper back, buttocks on bench; both feet flat on floor. Eyes directly under the bar. Grip: closed pronated grip, slightly wider than shoulder-width (forearms vertical at chest level). Shoulders pulled back and down ("packed"). Slight natural arch in low back. Take a deep breath, brace.', tags: ['technique', 'bench-press', 'high-yield', 'foundational'] },
          { q: 'What are the cues for the bench press descent and press?', a: 'Descent: control bar down to mid-chest (not throat, not stomach). Forearms vertical at bottom. Elbows tucked ~45-75° from torso (not flared 90°). Press: bar moves up and slightly back over the shoulders in a slight J-path. Drive feet into floor (leg drive). Exhale through the sticking point.', tags: ['technique', 'bench-press', 'high-yield'] },
          { q: 'Name common bench press errors and corrections.', a: 'Elbows flaring 90° → shoulder injury risk; cue "tuck elbows." Bar bouncing off chest → control descent, slight pause. Butt lifting off bench → core too weak or arch too aggressive; cue "press feet, not lift hips." Wrists bent back → stack wrist over forearm; check grip width. Uneven press → check shoulder mobility, side dominance.', tags: ['technique', 'bench-press', 'high-yield'] },
          { q: 'Why is an open/false grip dangerous on the bench press?', a: 'Without the thumb wrapped around the bar, the bar can slip backward and drop onto the chest, neck, or face. Multiple deaths have occurred from this. Called the "suicide grip" for a reason. The NSCA standard is closed (thumb-wrapped) grip on all bench variations.', tags: ['technique', 'bench-press', 'safety', 'high-yield'] },
          { q: 'How does grip width affect the bench press?', a: 'Wider grip (>1.5x biacromial width): shorter ROM, more chest emphasis. Narrower grip: longer ROM, more triceps emphasis, less stress on the anterior shoulder. Very wide grips (powerlifting style) are limited by IPF rule of ≤81 cm hand spacing. Most athletes benefit from a moderate grip that puts forearms vertical at chest level.', tags: ['technique', 'bench-press'] },
        ]
      },
      {
        id: 'power-clean',
        title: 'The Power Clean',
        cards: [
          { q: 'Describe the starting position of a power clean.', a: 'Bar over mid-foot (~1 inch in front of shins). Closed pronated hook grip, shoulder-width or slightly wider. Hips between knees and shoulders. Knees inside the arms. Shoulders SLIGHTLY in front of the bar. Back flat / neutral. Chest up. Lats engaged. Eyes forward or slightly down.', tags: ['technique', 'olympic-lifts', 'high-yield', 'foundational'] },
          { q: 'Name the five phases of the power clean.', a: '(1) First pull: bar from floor to just above knees — knees extend, hips stay back, torso angle constant. (2) Transition (scoop): hips rise, knees re-bend slightly. (3) Second pull (explosion): triple extension of hips, knees, ankles + shrug. (4) Catch: drop under the bar into a quarter-front-squat, catch on anterior delts/clavicle. (5) Recovery: stand up.', tags: ['technique', 'olympic-lifts', 'high-yield'] },
          { q: 'What is triple extension?', a: 'Simultaneous explosive extension of the hips, knees, and ankles (plantarflexion) — the powerful jumping action that drives the second pull of the clean (and snatch). Generates the bar\'s vertical acceleration. The hallmark athletic movement pattern. Trained directly in clean, snatch, and jump variations.', tags: ['technique', 'olympic-lifts', 'high-yield'] },
          { q: 'What are the most important cues for the power clean second pull?', a: '"Jump and shrug" (some coaches: "violent shrug"). Elbows pull HIGH and OUTSIDE (not back). Bar stays CLOSE to the body throughout. Triple extension is complete and aggressive before the body drops under the bar. The faster the bar can move, the easier it is to catch.', tags: ['technique', 'olympic-lifts', 'high-yield'] },
          { q: 'Where should the bar be caught in a power clean?', a: 'On the anterior deltoids and clavicles ("front rack" position) — same position as the start of the front squat. Elbows HIGH and forward (not down). Loose grip — fingers may release from the bar; bar held by the shelf of the deltoids. Torso almost fully erect, shoulders slightly ahead of buttocks, in a quarter-squat (not below parallel for power clean).', tags: ['technique', 'olympic-lifts', 'high-yield'] },
          { q: 'Name common power clean errors and corrections.', a: 'Hips rise before shoulders (early hip extension) → "stay over the bar longer." Bar swings forward → keep bar close, cue "bar to body." Reverse curling the bar → focus on triple extension and bar elevation FIRST, then pull under. Soft catch (rounded back) → strengthen front squat. Slow elbows → "fast elbows" cue.', tags: ['technique', 'olympic-lifts', 'high-yield'] },
        ]
      },
      {
        id: 'overhead-other',
        title: 'Overhead, Pull, and Auxiliary Lifts',
        cards: [
          { q: 'Describe proper overhead (military) press technique.', a: 'Stance: hip- to shoulder-width, feet flat. Bar in front rack at clavicles/anterior delts, elbows down/under bar. Press straight up — bar travels over the head (not in front). Lock out with head "through the window" (pushed forward as bar passes). Lower under control to clavicles. NOT behind-the-neck (shoulder impingement risk).', tags: ['technique', 'overhead', 'high-yield'] },
          { q: 'What is a push press, and how does it differ from a strict overhead press?', a: 'Push press: uses leg drive (a small dip and explosive extension of hips/knees) to drive the bar overhead. Allows ~30% heavier loads than strict press. Bar is "punched" overhead. Useful for power development and as an Oly lift accessory. Strict press: no lower body involvement — pure shoulder/triceps strength.', tags: ['technique', 'overhead', 'high-yield'] },
          { q: 'Describe the pull-up and chin-up.', a: 'Pull-up: pronated (overhand) grip, palms facing away. Shoulder-width or slightly wider. Chin-up: supinated (underhand) grip, palms facing in. Both: dead hang, scapulae packed (depressed and retracted). Pull until chin clears the bar. Lower under control. Chin-up has more biceps and lat involvement; pull-up emphasizes lats and rear delts.', tags: ['technique', 'pull', 'high-yield'] },
          { q: 'What is a Romanian deadlift vs a stiff-leg deadlift?', a: 'RDL: starts from the top (rack or after a clean). Knees stay softly bent and unchanged. Hip-hinge dominant. Bar to about mid-shin. Stiff-leg deadlift: starts from the floor. Knees STRAIGHT (not locked, but stiffer than RDL). Longer ROM, deeper hamstring stretch. RDL is more accessible and commonly programmed; SLDL is more advanced and stress hamstrings more aggressively.', tags: ['technique', 'deadlift', 'high-yield'] },
          { q: 'Describe proper barbell row technique.', a: 'Hip-hinge to ~45° torso angle. Closed pronated or supinated grip. Pull bar to lower chest / upper abdomen. Elbows track close to body (not flared 90°). Squeeze shoulder blades at top. Lower under control. Common errors: jerking with body english, rounded back, pulling to throat instead of belly.', tags: ['technique', 'pull'] },
          { q: 'What is the Bulgarian split squat and why is it valuable?', a: 'Rear leg elevated on a bench/box. Front leg performs the squatting work. Develops unilateral strength, hip mobility, balance, and addresses left-right asymmetries. Lower spinal load than a back squat — useful for athletes during in-season or with low-back issues. Common error: rear leg pushing off too much; cue "front leg does the work."', tags: ['technique', 'lower-body'] },
          { q: 'What is the kettlebell swing?', a: 'A ballistic hip-hinge exercise. Russian style: bar swings to chest height with explosive hip extension. American style: bar overhead. Cues: "snap hips," "punch the bell forward" (not lifted with arms). Excellent for posterior chain power, conditioning, and athletic carry-over. NOT a squat — it\'s a hinge.', tags: ['technique', 'olympic-lifts'] },
          { q: 'Describe proper lunge technique.', a: 'Step forward (or backward, or to side). Drop straight down — front knee tracks over toes, doesn\'t collapse inward. Back knee descends toward the floor (just kisses or comes within inches). Front shin stays roughly vertical (slight forward angle OK). Drive through the front heel. Maintain upright torso. Common error: knee diving inward (valgus collapse).', tags: ['technique', 'lower-body'] },
        ]
      },
    ]
  },
  phase15: {
    id: 'phase15',
    title: 'Phase XV — Special Populations & Environmental Physiology',
    subtitle: 'Adapting training across ages, conditions, and environments',
    color: '#9D0208',
    icon: 'Activity',
    description: 'ACSM Guidelines (12th ed.) special populations content + environmental physiology. Covers what a coach must know to safely program for diverse athletes and conditions.',
    domains: [
      {
        id: 'youth-training',
        title: 'Youth & Adolescent Training',
        cards: [
          { q: 'Is resistance training safe for youth?', a: 'YES. NSCA, AAP, and ACSM all support youth resistance training when properly supervised and progressed. The decades-old myth of "stunting growth via growth plate injury" is not supported by evidence — properly programmed RT actually PROMOTES bone development. Greatest risk comes from unsupervised loading and improper technique, not from training itself.', tags: ['youth', 'special-pops', 'high-yield', 'foundational'] },
          { q: 'What are the physical activity guidelines for children 6-17?', a: '60+ minutes of moderate-to-vigorous activity DAILY. Mostly aerobic, with vigorous-intensity on 3+ days/week. Muscle-strengthening activities on 3+ days/week. Bone-strengthening activities on 3+ days/week. Only ~24% of US youth currently meet these standards.', tags: ['youth', 'special-pops', 'high-yield'] },
          { q: 'What is peak height velocity (PHV) and why does it matter?', a: 'The age of fastest growth during the adolescent growth spurt. Girls: ~11-13 years. Boys: ~13-15 years. Athletes go through "adolescent awkwardness" around PHV — temporary motor control deficits as the body rapidly changes proportions. Programming must account for this; injury risk also briefly spikes during this period.', tags: ['youth', 'special-pops', 'high-yield'] },
          { q: 'What are the principles of LTAD (Long-Term Athlete Development)?', a: 'Match training to developmental stage, not chronological age. Develop a broad foundation of fundamental movement and biomotor abilities BEFORE specialization. Avoid early sport specialization. Build progressively across childhood, adolescence, and adulthood. Sample stages: Active Start → FUNdamentals → Learn to Train → Train to Train → Train to Compete → Train to Win → Active for Life.', tags: ['youth', 'special-pops', 'high-yield'] },
          { q: 'Why is early sport specialization discouraged?', a: 'Single-sport focus before age 12-14 is associated with: higher overuse injury rates (3-5x in some studies), burnout, dropout, and surprisingly NO better long-term elite performance outcomes than multi-sport sampling. The American Orthopaedic Society for Sports Medicine and many governing bodies now recommend sampling multiple sports through early adolescence.', tags: ['youth', 'special-pops', 'high-yield'] },
          { q: 'What is the sensitive period concept in youth training?', a: 'Windows of accelerated trainability for specific qualities. Speed: early childhood AND post-PHV. Endurance: peri-PHV and post-PHV. Strength: post-PHV (with hormonal increases). Coordination/skill: pre-PHV. Important: these are GUIDELINES, not strict rules. All qualities can be developed at any age; some periods just yield faster adaptation.', tags: ['youth', 'special-pops'] },
          { q: 'How should programming differ for pre-pubertal youth?', a: 'Emphasize: bodyweight resistance, movement skill, technique mastery, FUN, multi-skill exposure. Light external loads if any. Higher reps (8-15+), 1-3 sets, focus on quality over load. Plyometrics: low-intensity, lower-volume. AVOID maximal lifts. Strength gains pre-puberty are largely NEURAL — improving motor unit recruitment and movement quality.', tags: ['youth', 'special-pops', 'high-yield'] },
        ]
      },
      {
        id: 'older-adults',
        title: 'Older Adult Training',
        cards: [
          { q: 'What is sarcopenia?', a: 'Age-related loss of muscle mass and strength. Begins ~30 years old (~1% mass loss per year), accelerates after 60. By 80, individuals may have lost 30%+ of peak muscle mass. Strength declines faster than mass — also driven by neural decline. Strongly predictive of disability, falls, and mortality. Resistance training is the primary intervention.', tags: ['older-adults', 'special-pops', 'high-yield', 'foundational'] },
          { q: 'What are the ACSM exercise guidelines for older adults?', a: 'Aerobic: ≥150 min/week moderate or ≥75 min/week vigorous. Resistance: ≥2 days/week, all major muscle groups. Flexibility: ≥2 days/week. Balance: ≥3 days/week (critical for fall prevention). All four modalities are recommended — not just aerobic.', tags: ['older-adults', 'special-pops', 'high-yield'] },
          { q: 'What is dynapenia?', a: 'Age-related loss of muscle STRENGTH (separate from mass loss / sarcopenia). Strength declines faster than mass with aging. Even older adults who maintain muscle mass can lose strength due to neural and contractile changes. Power (strength × velocity) declines even faster — important because power matters most for ADL function and fall recovery.', tags: ['older-adults', 'special-pops', 'high-yield'] },
          { q: 'Why is power training especially important for older adults?', a: 'Power (rate of force development) declines faster with age than strength alone. Power is what catches you when you trip; what gets you up from a chair; what crosses a street. Velocity-based / power training in older adults (40-60% 1RM moved with maximal intent) improves functional outcomes more than slow heavy lifting.', tags: ['older-adults', 'special-pops', 'high-yield'] },
          { q: 'What is the role of balance training in older adults?', a: 'Falls are a leading cause of injury and death in older adults. Balance training — single-leg stance, perturbation training, Tai Chi-style work, BOSU/unstable surface drills — reduces fall risk by ~30%. Should be programmed 3+ days/week. Combined with strength and power work for maximal effect.', tags: ['older-adults', 'special-pops', 'high-yield'] },
          { q: 'What is osteopenia/osteoporosis and how does training help?', a: 'Osteopenia: low bone mineral density (BMD T-score -1.0 to -2.5). Osteoporosis: T-score < -2.5. Higher fracture risk. Weight-bearing exercise, impact loading (jumping when safe), and resistance training stimulate osteogenic adaptations via Wolff\'s law. Most effective when started young, but bone responds at all ages.', tags: ['older-adults', 'special-pops', 'high-yield'] },
          { q: 'What special considerations apply to older-adult resistance training?', a: 'Longer warm-up. Lighter starting loads (~60% 1RM); progress slowly. Higher reps (8-12+) with good technique. Avoid Valsalva (BP concerns). Watch for joint pain — modify ROM and loading. Watch for medications affecting exercise tolerance (beta-blockers blunt HR, diuretics affect hydration). Always screen for cardiovascular contraindications.', tags: ['older-adults', 'special-pops', 'high-yield'] },
        ]
      },
      {
        id: 'pregnancy',
        title: 'Pregnancy & Postpartum',
        cards: [
          { q: 'What are ACSM exercise guidelines during pregnancy?', a: 'Healthy women should accumulate 150 min/week of moderate-intensity activity. 3-4 days/week minimum. Start at 15 min/day, build to 30. Include aerobic AND resistance training AND pelvic floor exercises. Continue prior exercise habits with modifications. Absolute contraindications must be ruled out by physician first.', tags: ['pregnancy', 'special-pops', 'high-yield'] },
          { q: 'What activities should pregnant women avoid?', a: 'Contact sports (football, basketball, soccer high-contact). Activities with high fall risk (gymnastics, horseback riding, downhill skiing). Scuba diving. Hot yoga / hot environments. After 1st trimester: supine exercises >5 min (vena cava compression). Anything causing impact to the abdomen. Heavy Valsalva. Listen to symptoms and modify.', tags: ['pregnancy', 'special-pops', 'high-yield'] },
          { q: 'What is diastasis recti?', a: 'Separation of the rectus abdominis along the linea alba during pregnancy. >2 finger-width separation is considered diastasis. Avoid exercises causing visible "coning" or "doming" of the abdomen during pregnancy and postpartum (crunches, sit-ups, planks until cleared). Specific rehab focuses on transverse abdominis activation.', tags: ['pregnancy', 'special-pops', 'high-yield'] },
          { q: 'What are absolute contraindications to exercise during pregnancy?', a: 'Hemodynamically significant heart disease, restrictive lung disease, incompetent cervix, multiple gestation at risk for premature labor, persistent 2nd/3rd trimester bleeding, placenta previa after 26 weeks, premature labor in current pregnancy, ruptured membranes, preeclampsia, severe anemia. These require medical clearance before any exercise.', tags: ['pregnancy', 'special-pops', 'high-yield'] },
          { q: 'When can a woman return to exercise postpartum?', a: 'After uncomplicated vaginal delivery: typically cleared at 6 weeks. After C-section: 8-12 weeks, sometimes longer. Begin with gentle walking, breathing exercises, gentle pelvic floor work. Progress gradually. Watch for: bleeding, pain, doming/coning of abdomen, urinary leakage. Pelvic floor PT can be very valuable in this transition.', tags: ['pregnancy', 'special-pops'] },
        ]
      },
      {
        id: 'chronic-conditions',
        title: 'Chronic Conditions',
        cards: [
          { q: 'How does exercise affect type 2 diabetes?', a: 'Exercise improves insulin sensitivity acutely (lasting 24-72 hours) AND chronically. Resistance training + aerobic combined is most effective. HbA1c reductions of 0.5-1.0% with consistent training. Both aerobic (≥150 min/wk moderate) and RT (2-3 days/wk) recommended. Beware of hypoglycemia if on insulin or sulfonylureas — monitor blood glucose pre/post.', tags: ['chronic', 'special-pops', 'high-yield'] },
          { q: 'How should hypertensive patients train?', a: 'Aerobic exercise lowers BP by 5-7 mmHg systolic on average — comparable to first-line medications. Recommend ≥150 min/wk moderate aerobic, 3-7 days/wk. Resistance training is SAFE and beneficial, but use moderate loads (60-70% 1RM), avoid heavy Valsalva. Uncontrolled HTN (>180/110): no vigorous exercise until medically managed.', tags: ['chronic', 'special-pops', 'high-yield'] },
          { q: 'What exercise considerations apply for cardiovascular disease patients?', a: 'Always require physician clearance + cardiac rehab supervision initially. Aerobic: 3-5 days/wk at moderate intensity (40-80% HRR). Resistance: 2-3 days/wk, light-to-moderate loads (40-60% 1RM), higher reps, avoid Valsalva. Stop exercise immediately for chest pain, severe shortness of breath, dizziness, or unusual fatigue. Use HR-RPE consistency.', tags: ['chronic', 'special-pops', 'high-yield'] },
          { q: 'How does exercise affect asthma?', a: 'Exercise-induced bronchoconstriction (EIB) affects 90% of asthmatics. Pre-treatment with short-acting beta-agonist (albuterol) 15 min before. Long warm-up (15-30 min) actually reduces symptoms. Avoid cold/dry air when possible. Indoor pool environments may trigger from chlorine byproducts. Regular aerobic training IMPROVES asthma control over time.', tags: ['chronic', 'special-pops'] },
          { q: 'How is exercise programming modified for arthritis?', a: 'Low-impact aerobic (swimming, cycling, walking, elliptical) preferred. RT with ROM emphasis. Avoid heavy axial loading in advanced OA. Pool / aquatic exercise excellent for severe cases. "Movement is medicine" — sedentary worsens joint pain and function. Pain should not increase by more than 2 points (on 0-10) during/after exercise; if so, modify.', tags: ['chronic', 'special-pops'] },
        ]
      },
      {
        id: 'environment',
        title: 'Environmental Physiology',
        cards: [
          { q: 'What are the four mechanisms of heat loss?', a: 'Radiation: heat lost as infrared waves (dominant at rest in cool environments). Conduction: direct contact (cool bench, water). Convection: heat lost to moving air/water (fan, wind). Evaporation: sweat → vapor (dominant during exercise, especially in heat). High humidity impairs evaporation, leading to rapid heat strain.', tags: ['environment', 'thermoregulation', 'high-yield'] },
          { q: 'What is the timeline of heat acclimatization?', a: 'Days 1-5: HR reduction develops most rapidly. Days 5-7: HR adaptation essentially complete. Days 7-14: most thermoregulatory benefits complete. Days 10-14: sweat rate increases peak. Full adaptation: ~2 weeks of daily ~90-min heat exposure. Plasma volume expands 10-12%, sweat rate increases, sweat sodium decreases, core temperature drops.', tags: ['environment', 'thermoregulation', 'high-yield', 'foundational'] },
          { q: 'What are the physiological adaptations to heat acclimatization?', a: '(1) Expanded plasma volume (+10-12%) — better cardiac filling. (2) Earlier sweating onset. (3) Increased sweat rate. (4) Lower sweat sodium concentration. (5) Reduced HR at given workload. (6) Lower core temperature. (7) Better thermal comfort. Together these allow training and competition in heat with less performance decrement and lower illness risk.', tags: ['environment', 'thermoregulation', 'high-yield'] },
          { q: 'What is heat exhaustion vs heat stroke?', a: 'Heat exhaustion: core temp 100-104°F, profuse sweating, weakness, nausea, headache, cool/clammy skin, normal mental status. Treatment: rest, cool environment, hydration. Heat stroke: core temp >104°F, ALTERED MENTAL STATUS (confusion, seizures, coma), may or may not still be sweating. MEDICAL EMERGENCY — immediate cooling (ice bath) and 911.', tags: ['environment', 'safety', 'high-yield', 'foundational'] },
          { q: 'What is the WBGT (Wet Bulb Globe Temperature) index?', a: 'A composite metric combining ambient temp, humidity, wind, and solar radiation — better than air temperature alone for assessing heat strain risk. Used by military, athletic governing bodies. NCAA guidelines: WBGT >82°F warrants extended breaks; >92°F suspends practice. Coaches in hot regions should monitor WBGT, not just air temp.', tags: ['environment', 'safety', 'high-yield'] },
          { q: 'What happens at altitude?', a: 'Partial pressure of O₂ decreases proportionally to elevation. Above 1,500 m (5,000 ft), performance starts to decline measurably. VO₂max drops ~1-2% per 100 m above 1,500 m. Hypoxic ventilatory response increases breathing rate. EPO release stimulates red blood cell production (over weeks). Hydration needs increase (dry air, hyperventilation).', tags: ['environment', 'altitude', 'high-yield'] },
          { q: 'What are the timeline and adaptations of altitude acclimatization?', a: 'Hours-days: increased ventilation, increased HR. Days-week: plasma volume decreases (initially concentrating Hb). 2-4 weeks: erythropoietin → reticulocytes → increased RBC mass (~3-7% rise). Performance at altitude improves over 3-4 weeks. Sea-level performance after return improves transiently — basis of "live high, train low" strategy.', tags: ['environment', 'altitude', 'high-yield'] },
          { q: 'What is acute mountain sickness (AMS)?', a: 'Occurs above ~2,500 m (8,000 ft). Symptoms: headache, nausea, fatigue, dizziness, sleep disturbance. Typically resolves in 1-3 days. Progression to high-altitude pulmonary edema (HAPE) or cerebral edema (HACE) is rare but LIFE-THREATENING. Treatment: descent. Prevention: graded ascent, hydration, acetazolamide (Diamox) if needed.', tags: ['environment', 'altitude', 'safety'] },
          { q: 'How does cold affect exercise performance?', a: 'Below ~10°C / 50°F, muscle temperature drops, reducing rate of force development and increasing injury risk. Shivering thermogenesis costs energy. Vasoconstriction in extremities. Hypothermia (core <95°F) is medical emergency. Wear layered, wicking fabrics. Extended warm-up. Watch for frostbite in extremities. Slick surfaces increase fall risk.', tags: ['environment', 'cold', 'high-yield'] },
          { q: 'What is exercise-induced bronchoconstriction (EIB) in cold environments?', a: 'Cold, dry air dries the airways, causing reflex bronchoconstriction in susceptible athletes — even those without baseline asthma. Common in winter sports (XC skiing, hockey). Symptoms: cough, wheeze, chest tightness, shortness of breath. Management: warm-up scarf/mask, pre-medication with bronchodilator if needed, extended warm-up.', tags: ['environment', 'cold'] },
        ]
      },
    ]
  },
  phase16: {
    id: 'phase16',
    title: 'Phase XVI — Muscle Anatomy Reference',
    subtitle: 'Origin, insertion, action — the muscles tested most',
    color: '#BC4749',
    icon: 'Activity',
    description: 'The muscle anatomy questions that show up repeatedly on the CSCS. Origins, insertions, primary actions, and joints crossed for the muscles most frequently tested in exam scenarios. Build the foundation here that everything else relies on.',
    domains: [
      {
        id: 'upper-body-muscles',
        title: 'Upper Body Muscles',
        cards: [
          { q: 'Pectoralis major — origin, insertion, action.', a: 'Origin: clavicular head (medial half of clavicle), sternocostal head (sternum and costal cartilages of ribs 1-6). Insertion: lateral lip of intertubercular groove of humerus. Action: shoulder horizontal adduction, internal rotation, flexion (clavicular fibers) and extension (sternocostal fibers in adducted arm). The bench press prime mover.', tags: ['anatomy', 'muscles', 'high-yield', 'foundational'] },
          { q: 'Latissimus dorsi — origin, insertion, action.', a: 'Origin: spinous processes of T7-L5, thoracolumbar fascia, iliac crest, lower 3-4 ribs, inferior angle of scapula. Insertion: intertubercular (bicipital) groove of humerus. Action: shoulder extension, adduction, internal rotation. The biggest back muscle — pull-ups, rows, pulldowns.', tags: ['anatomy', 'muscles', 'high-yield', 'foundational'] },
          { q: 'Deltoid — origin, insertion, action.', a: 'Origin: lateral third of clavicle (anterior fibers), acromion (middle fibers), spine of scapula (posterior fibers). Insertion: deltoid tuberosity of humerus. Action: shoulder abduction (middle fibers); anterior fibers flex and internally rotate; posterior fibers extend and externally rotate. Three-headed.', tags: ['anatomy', 'muscles', 'high-yield'] },
          { q: 'Biceps brachii — origin, insertion, action.', a: 'Origin: long head from supraglenoid tubercle of scapula, short head from coracoid process of scapula. Insertion: radial tuberosity. Action: elbow flexion, forearm supination, weak shoulder flexion. Two-headed, two-joint muscle. Vulnerable at the long head (biceps tendinitis, SLAP tears).', tags: ['anatomy', 'muscles', 'high-yield'] },
          { q: 'Triceps brachii — origin, insertion, action.', a: 'Origin: long head from infraglenoid tubercle of scapula, lateral head from posterior humerus above radial groove, medial head from posterior humerus below radial groove. Insertion: olecranon process of ulna. Action: elbow extension; long head also extends and adducts shoulder. Bench press lockout muscle.', tags: ['anatomy', 'muscles', 'high-yield'] },
          { q: 'Trapezius — origin, insertion, and the three fiber regions.', a: 'Origin: external occipital protuberance, ligamentum nuchae, spinous processes of C7-T12. Insertion: lateral third of clavicle, acromion, spine of scapula. Upper fibers: elevate and upwardly rotate scapula. Middle fibers: retract scapula. Lower fibers: depress and upwardly rotate scapula. Critical for scapulohumeral rhythm.', tags: ['anatomy', 'muscles', 'high-yield'] },
          { q: 'Rhomboids (major and minor) — origin, insertion, action.', a: 'Origin: spinous processes of C7-T5. Insertion: medial border of scapula. Action: scapular retraction, downward rotation, slight elevation. Antagonist to serratus anterior in the retraction-protraction couple. Often weak and inhibited in chronically protracted postures.', tags: ['anatomy', 'muscles'] },
          { q: 'Serratus anterior — origin, insertion, action.', a: 'Origin: lateral surface of ribs 1-8 or 1-9. Insertion: anterior (costal) surface of medial border of scapula. Action: scapular protraction and upward rotation. Anti-winging muscle. Weakness (or long thoracic nerve injury) causes classic scapular winging. Critical for overhead lifting and throwing.', tags: ['anatomy', 'muscles', 'high-yield'] },
          { q: 'The four rotator cuff muscles (SITS) — name, action, common dysfunction.', a: 'Supraspinatus: initiates abduction first 15°, stabilizes humeral head. MOST commonly injured (impingement). Infraspinatus: external rotation. Teres minor: external rotation. Subscapularis: internal rotation. All four center the humeral head in the glenoid during deltoid-driven elevation.', tags: ['anatomy', 'muscles', 'high-yield', 'foundational'] },
          { q: 'Pectoralis minor — origin, insertion, clinical relevance.', a: 'Origin: anterior surface of ribs 3-5. Insertion: coracoid process of scapula. Action: scapular protraction, depression, downward rotation. Often tight in rounded-shoulder posture — can compress neurovascular structures (thoracic outlet syndrome). A frequent target of corrective lengthening.', tags: ['anatomy', 'muscles'] },
        ]
      },
      {
        id: 'core-spine-muscles',
        title: 'Core & Spine Muscles',
        cards: [
          { q: 'Rectus abdominis — origin, insertion, action.', a: 'Origin: pubic crest and pubic symphysis. Insertion: xiphoid process and costal cartilages of ribs 5-7. Action: trunk flexion, lateral flexion (unilateral). The "six-pack" muscle. Limited role in sport movement compared to obliques and deep stabilizers.', tags: ['anatomy', 'muscles', 'core', 'high-yield'] },
          { q: 'External obliques — origin, insertion, action.', a: 'Origin: external surfaces of ribs 5-12. Insertion: linea alba, pubic tubercle, anterior iliac crest. Action: trunk flexion (bilateral), ipsilateral lateral flexion (unilateral), CONTRALATERAL rotation. Fibers run in a "hands-in-front-pockets" direction.', tags: ['anatomy', 'muscles', 'core', 'high-yield'] },
          { q: 'Internal obliques — origin, insertion, action.', a: 'Origin: thoracolumbar fascia, anterior iliac crest, inguinal ligament. Insertion: ribs 10-12, linea alba, pubis. Action: trunk flexion, ipsilateral lateral flexion, IPSILATERAL rotation. Fibers run perpendicular to externals — "hands-coming-out-of-pockets." Rotation pairs same-side IO with opposite-side EO.', tags: ['anatomy', 'muscles', 'core', 'high-yield'] },
          { q: 'Transverse abdominis (TrA) — origin, insertion, action.', a: 'Origin: thoracolumbar fascia, anterior iliac crest, inguinal ligament, costal cartilages of ribs 7-12. Insertion: linea alba, pubic crest. Action: compresses abdominal contents — increases intra-abdominal pressure for spinal stability. The deepest abdominal — wraps the trunk like a corset. The local stabilizer.', tags: ['anatomy', 'muscles', 'core', 'high-yield'] },
          { q: 'Erector spinae group — what are the three muscles and their action?', a: 'Iliocostalis (most lateral), longissimus (middle), spinalis (most medial). Origin: sacrum, iliac crest, spinous and transverse processes of vertebrae. Insertion: ribs, transverse and spinous processes superior to origin, mastoid process. Action: spinal extension, ipsilateral lateral flexion. Mnemonic: "I Love Spaghetti" (lateral to medial).', tags: ['anatomy', 'muscles', 'core', 'high-yield'] },
          { q: 'Quadratus lumborum (QL) — origin, insertion, action.', a: 'Origin: posterior iliac crest. Insertion: 12th rib and transverse processes of L1-L4. Action: lateral flexion of trunk (ipsilateral), hip hiking, stabilization of pelvis during single-leg stance. Often tight and overworked in low-back pain. The "hip hiker."', tags: ['anatomy', 'muscles', 'core'] },
          { q: 'Multifidi — clinical importance.', a: 'Origin/insertion: span 1-4 vertebral segments (sacrum and transverse processes → spinous processes of vertebrae above). The deepest spinal stabilizer. Provides segmental control of vertebral motion. Atrophies after low-back injury — even after pain resolves — and must be specifically rehabbed. A key local stabilizer.', tags: ['anatomy', 'muscles', 'core', 'high-yield'] },
        ]
      },
      {
        id: 'lower-body-muscles',
        title: 'Lower Body Muscles',
        cards: [
          { q: 'Gluteus maximus — origin, insertion, action.', a: 'Origin: posterior ilium, sacrum, coccyx. Insertion: iliotibial tract and gluteal tuberosity of femur. Action: primary hip extension, hip external rotation (upper fibers), hip abduction (upper fibers via IT band). Biggest muscle in the body. Critical for sprinting, jumping, squatting.', tags: ['anatomy', 'muscles', 'high-yield', 'foundational'] },
          { q: 'Gluteus medius — origin, insertion, action.', a: 'Origin: external surface of ilium between anterior and posterior gluteal lines. Insertion: greater trochanter of femur. Action: primary hip abductor, pelvic stabilizer in single-leg stance. Anterior fibers internal rotate; posterior fibers external rotate. Weakness causes Trendelenburg gait and knee valgus.', tags: ['anatomy', 'muscles', 'high-yield'] },
          { q: 'Iliopsoas — origin, insertion, action.', a: 'Combined muscle: PSOAS MAJOR origin from T12-L5 vertebrae; ILIACUS origin from iliac fossa. Insertion: lesser trochanter of femur. Action: primary hip flexor. The only muscle connecting the spine to the lower limb. Often tight from prolonged sitting.', tags: ['anatomy', 'muscles', 'high-yield', 'foundational'] },
          { q: 'Quadriceps femoris — name the four muscles and their actions.', a: 'Rectus femoris (anterior — only one crossing hip): hip flexion + knee extension. Vastus lateralis (lateral): knee extension. Vastus medialis (medial — VMO key for patellar tracking): knee extension. Vastus intermedius (deep): knee extension. All insert via the quadriceps/patellar tendon into the tibial tuberosity.', tags: ['anatomy', 'muscles', 'high-yield', 'foundational'] },
          { q: 'Hamstrings — name the three muscles, their origin and insertion.', a: 'Biceps femoris (long and short heads — lateral hamstring): origin from ischial tuberosity (long head) and linea aspera (short head); insertion on fibular head. Semitendinosus (medial): ischial tuberosity → pes anserinus on medial tibia. Semimembranosus (medial, deep): ischial tuberosity → medial tibial condyle. All three: hip extension and knee flexion.', tags: ['anatomy', 'muscles', 'high-yield'] },
          { q: 'Adductor group — name the five muscles and primary action.', a: 'Adductor longus, adductor brevis, adductor magnus, gracilis, pectineus. All originate on the pubis or ischium; insert on linea aspera of femur (gracilis goes to medial tibia at pes anserinus). Primary action: hip adduction. Also contribute to hip flexion (most) and some assist hip extension (adductor magnus posterior fibers).', tags: ['anatomy', 'muscles'] },
          { q: 'Gastrocnemius — origin, insertion, action.', a: 'Origin: medial and lateral condyles of femur (a two-joint muscle). Insertion: calcaneus via Achilles tendon. Action: ankle plantarflexion and knee flexion (the two-joint advantage). Type II dominant — explosive. Stretches and produces force best with knee EXTENDED.', tags: ['anatomy', 'muscles', 'high-yield'] },
          { q: 'Soleus — origin, insertion, action.', a: 'Origin: posterior tibia and fibula (a one-joint muscle below the knee). Insertion: calcaneus via Achilles tendon. Action: ankle plantarflexion only. Type I dominant — postural and endurance. Stretches and produces force best with knee FLEXED (gastroc taken out by knee bend).', tags: ['anatomy', 'muscles', 'high-yield'] },
          { q: 'Tibialis anterior — origin, insertion, action.', a: 'Origin: lateral surface of tibia. Insertion: medial cuneiform and base of 1st metatarsal. Action: ankle dorsiflexion and inversion. Antagonist to the gastroc-soleus. Often weak relative to calves in athletes with limited dorsiflexion. Source of "shin splints" overuse.', tags: ['anatomy', 'muscles'] },
        ]
      },
    ]
  },
  phase17: {
    id: 'phase17',
    title: 'Phase XVII — High-Yield Exam Numbers & Tables',
    subtitle: 'The specific values the CSCS exam tests most',
    color: '#FB8500',
    icon: 'BarChart3',
    description: 'The %1RM/rep mapping (Table 17.7), energy system work-to-rest ratios, hypertrophy/strength/power/endurance acute variables, recovery times, and other specific values that appear repeatedly on the CSCS exam. This is the cheat-sheet content you must know cold.',
    domains: [
      {
        id: 'load-rep-tables',
        title: 'Load, Rep & Volume Tables',
        cards: [
          { q: 'Memorize the NSCA %1RM → max rep relationship.', a: '100% = 1 rep. 95% = 2 reps. 93% = 3 reps. 90% = 4 reps. 87% = 5 reps. 85% = 6 reps. 83% = 7 reps. 80% = 8 reps. 77% = 9 reps. 75% = 10 reps. 70% = 12 reps. Quick rule: drop ~5% per 2 reps added. Memorize cold — drives many exam questions.', tags: ['programming', 'load', 'high-yield', 'foundational'] },
          { q: 'What are the acute variables for muscular STRENGTH training?', a: 'Load: ≥85% 1RM. Reps: ≤6. Sets: 2-6. Rest: 2-5 minutes. Frequency: 2-3 days/week per muscle group. Goal: maximal force production. Heavy multi-joint compound exercises prioritized.', tags: ['programming', 'strength', 'high-yield', 'foundational'] },
          { q: 'What are the acute variables for HYPERTROPHY training?', a: 'Load: 67-85% 1RM. Reps: 6-12. Sets: 3-6. Rest: 30-90 seconds (short-moderate). Frequency: 2-3 days/week per muscle group. Goal: cross-sectional area increase. Time under tension matters; train close to failure.', tags: ['programming', 'hypertrophy', 'high-yield', 'foundational'] },
          { q: 'What are the acute variables for POWER training (single-effort events)?', a: 'Load: 80-90% 1RM (heavy Olympic-style movements). Reps: 1-2. Sets: 3-5. Rest: 2-5 minutes. Goal: maximize force × velocity. Heavy enough to challenge force, fast enough to maintain bar velocity. Single-effort events: shot put, high jump, max-effort Oly lift.', tags: ['programming', 'power', 'high-yield', 'foundational'] },
          { q: 'What are the acute variables for POWER training (multiple-effort events)?', a: 'Load: 75-85% 1RM. Reps: 3-5. Sets: 3-5. Rest: 2-5 minutes. Goal: sustained power over multiple efforts. Multiple-effort sports: basketball, soccer, football (continuous explosive efforts).', tags: ['programming', 'power', 'high-yield', 'foundational'] },
          { q: 'What are the acute variables for MUSCULAR ENDURANCE?', a: 'Load: ≤67% 1RM. Reps: ≥12. Sets: 2-3. Rest: ≤30 seconds. Frequency: 2-3 days/week. Goal: capacity to sustain submaximal contractions. Distance runners, swimmers, rowers benefit.', tags: ['programming', 'endurance', 'high-yield', 'foundational'] },
          { q: 'Explain the 2-for-2 rule.', a: 'A conservative load progression: if an athlete can complete 2 reps OVER the target rep for the last set on 2 consecutive training sessions for an exercise, increase the load. Example: target is 4×8 at 200 lb; athlete hits 10 reps on the last set in 2 consecutive sessions → bump load. NSCA standard for safe overload progression.', tags: ['programming', 'progression', 'high-yield'] },
          { q: 'How are load increases typically calculated?', a: 'Small upper-body muscles (e.g., biceps): +2.5-5 lb (1-2 kg). Large upper-body muscles (e.g., bench, row): +5-10 lb. Small lower-body muscles: +5-10 lb. Large lower-body muscles (squat, deadlift): +10-15 lb (5-7 kg). Less for women and novices; more for advanced athletes. Use the smaller increment if uncertain.', tags: ['programming', 'progression'] },
          { q: 'What is Prilepin\'s Table and why does it matter?', a: 'Soviet sports scientist A.S. Prilepin analyzed Olympic weightlifter training diaries and derived the optimal rep volume at each intensity zone. The table defines reps/set, optimal total reps, and acceptable range at four intensity bands. It tells you HOW MUCH total volume is appropriate at a given % 1RM — preventing under- or over-dosing. Widely applied beyond weightlifting to powerlifting and athletic S&C.', tags: ['programming', 'periodization', 'high-yield'] },
          { q: 'Prilepin\'s Table: 55-65% 1RM zone.', a: 'Reps per set: 3-6. Optimal total reps: 24. Acceptable range: 18-30. Moderate load, high volume. Used for speed-strength work, technique development, and early hypertrophy phases.', tags: ['programming', 'periodization', 'high-yield'] },
          { q: 'Prilepin\'s Table: 70-75% 1RM zone.', a: 'Reps per set: 3-6. Optimal total reps: 18. Acceptable range: 12-24. Strength-hypertrophy bridge zone — still relatively high volume but quality begins to matter more. Classic 3×6 or 4×4 territory.', tags: ['programming', 'periodization', 'high-yield'] },
          { q: 'Prilepin\'s Table: 80-85% 1RM zone.', a: 'Reps per set: 2-4. Optimal total reps: 15. Acceptable range: 10-20. Primary strength zone. A 5×5 = 25 reps — ABOVE the optimal range, risking technical breakdown and excess fatigue. Better: 4×3 (12 reps) or 5×3 (15 reps).', tags: ['programming', 'periodization', 'high-yield'] },
          { q: 'Prilepin\'s Table: 90%+ 1RM zone.', a: 'Reps per set: 1-2. Optimal total reps: 7. Acceptable range: 4-10. Maximal strength/peaking zone. Only a few quality reps are productive. A 5×2 at 90%+ = 10 reps — at the edge of the acceptable range. Used in peaking/realization blocks.', tags: ['programming', 'periodization', 'high-yield'] },
          { q: 'How do you use Prilepin\'s Table to design a strength block?', a: 'Identify the intensity zone for the block. Count total reps across all sets — aim for the optimal number, stay within the range. Example: week 1 at 75% — program 3×6 = 18 total reps (optimal). Week 4 at 87.5% — program 5×2 = 10 total reps (within range for >85%). The table prevents both insufficient stimulus (too few reps) and excessive fatigue (too many reps at high intensity).', tags: ['programming', 'periodization', 'high-yield'] },
        ]
      },
      {
        id: 'energy-systems-numbers',
        title: 'Energy System Numbers',
        cards: [
          { q: 'Phosphagen (ATP-PC) system — duration and work:rest ratio.', a: 'Duration: 0-6 seconds (some sources: 0-10 sec). Work:rest ratio = 1:12 to 1:20. Example: an 8-second sprint × 12 = 96 sec of rest. Primary fuel: stored ATP and creatine phosphate. Used for: maximal sprints, single-rep heavy lifts, throws, jumps.', tags: ['bioenergetics', 'energy-systems', 'high-yield', 'foundational'] },
          { q: 'Fast glycolysis system — duration and work:rest ratio.', a: 'Duration: ~6-30 seconds (some sources extend to 60-90 sec). Work:rest ratio = 1:3 to 1:5. Example: a 30-second sprint × 4 = 120 sec rest. Anaerobic, produces lactate. Used for: 400m sprint, 100m swim, mid-range power events.', tags: ['bioenergetics', 'energy-systems', 'high-yield', 'foundational'] },
          { q: 'Slow glycolysis & oxidative — duration and work:rest ratio.', a: 'Slow glycolysis: ~30 sec - 2 min, work:rest 1:3 to 1:4. Oxidative (aerobic): >2 min duration, work:rest 1:1 to 1:3. Examples: oxidative for distance running, cycling, longer endurance events. Endurance athletes use shorter rest ratios than power athletes.', tags: ['bioenergetics', 'energy-systems', 'high-yield'] },
          { q: 'ATP-PC system: time to deplete and replenish.', a: 'Depletes in ~10 seconds of max-effort work. ~50% recovery in 30 sec, ~75% in 60 sec, ~95-100% in 3-5 minutes. Why heavy strength training rest periods are 2-5 minutes — to fully restore CP before next set.', tags: ['bioenergetics', 'energy-systems', 'high-yield'] },
          { q: 'Glycogen restoration timing.', a: 'Muscle glycogen replenishment: ~5-7% per hour with adequate CHO intake. Full restoration: ~20-24 hours after exhaustive exercise. Faster with immediate post-exercise high-GI carbs (~1.0-1.2 g/kg/hr × 4 hours). Slower with intermittent eating or low-CHO diet.', tags: ['bioenergetics', 'recovery', 'high-yield'] },
          { q: 'Anaerobic to aerobic energy system contribution by event duration.', a: '10 sec: ~90% anaerobic, ~10% aerobic. 30 sec: ~75/25. 60 sec: ~55/45 (the famous "crossover"). 2 min: ~30/70. 4 min: ~20/80. 30+ min: ~5/95 aerobic dominant. Memorize the 1-minute crossover point.', tags: ['bioenergetics', 'energy-systems', 'high-yield', 'foundational'] },
        ]
      },
      {
        id: 'testing-norms',
        title: 'Testing Norms & Values',
        cards: [
          { q: 'Skinfold measurement sites (Jackson-Pollock 3-site for men).', a: 'Chest, abdomen, thigh. All measured on the RIGHT side of body. Vertical or diagonal as per protocol. Caliper held perpendicular, pinched ~1 cm from skinfold, read in 1-2 seconds. Two measurements within 1-2 mm of each other; average them.', tags: ['testing', 'body-comp', 'high-yield'] },
          { q: 'Skinfold measurement sites (Jackson-Pollock 3-site for women).', a: 'Triceps, suprailiac (above iliac crest), thigh. Vertical fold for triceps, diagonal for suprailiac, vertical for thigh. Same technique principles as the male sites.', tags: ['testing', 'body-comp', 'high-yield'] },
          { q: 'Common 1RM prediction equations.', a: 'Epley: 1RM = weight × (1 + reps/30). Brzycki: 1RM = weight × (36 / (37 - reps)). Best accuracy with <10 reps. Both produce similar values at 5 reps; diverge at higher reps. Memorize one and recognize the other.', tags: ['testing', 'strength', 'high-yield'] },
          { q: 'VO₂max norms — what is "average" vs "excellent" for college athletes?', a: 'Untrained male 18-25: ~35-45 mL/kg/min. Untrained female: ~30-40. Average college male athlete: ~50-55. Elite endurance male: 70-85. Elite endurance female: 60-75. Cross-country skiers and rowers have the highest recorded values (90+).', tags: ['testing', 'aerobic', 'high-yield'] },
          { q: 'What is the Karvonen formula for target heart rate?', a: 'Target HR = ((HRmax - HRrest) × intensity%) + HRrest. The "heart rate reserve" method. More accurate than %HRmax alone because it accounts for resting fitness. Example: HRmax 195, HRrest 60, training at 70% → ((195-60) × 0.70) + 60 = 154 bpm.', tags: ['testing', 'aerobic', 'high-yield'] },
          { q: 'How is maximum heart rate (HRmax) estimated?', a: 'Traditional: 220 − age (±10-15 bpm error). Tanaka equation (more accurate for older adults): 208 − (0.7 × age). Direct measurement (max effort test) is gold standard. Be cautious — these are population averages, individuals vary significantly.', tags: ['testing', 'aerobic'] },
        ]
      },
      {
        id: 'common-pitfalls',
        title: 'Common Pitfalls & Tricky Distinctions',
        cards: [
          { q: 'Reciprocal vs autogenic inhibition — which mechanism for which PNF?', a: 'Autogenic inhibition: muscle relaxes after its OWN isometric contraction via GTO. Used in HOLD-RELAX and CONTRACT-RELAX PNF. Reciprocal inhibition: agonist contraction inhibits antagonist via spinal interneurons. Used in HOLD-RELAX-AGONIST-CONTRACTION (HRAC / CRAC) for maximal stretching effect.', tags: ['flexibility', 'tricky', 'high-yield'] },
          { q: 'Periodization vs Programming — what\'s the distinction?', a: 'Periodization: the BIG PICTURE structure — phases, cycles, timing of adaptations across the year. A roadmap. Programming: the SPECIFIC sets, reps, exercises, loads chosen day-to-day. The route. Two coaches using the same periodization model may program very differently.', tags: ['programming', 'tricky', 'high-yield'] },
          { q: 'Strength vs Power — what makes them different?', a: 'Strength: force production capacity (load lifted). Power = force × velocity (rate of work). A 600 lb deadlift requires great strength but if it takes 3 seconds, the power is moderate. A 200 lb power clean done in 0.7 seconds is highly powerful but uses less strength. Power training emphasizes velocity AND load.', tags: ['programming', 'tricky', 'high-yield'] },
          { q: 'Open vs closed kinetic chain — definition and examples.', a: 'OPEN chain: distal segment is free to move (leg extension, dumbbell curl, bench press? — debated since shoulder rotates). CLOSED chain: distal segment is fixed (squat, push-up, pull-up). Closed-chain typically more functional and engages more stabilizers; open-chain isolates better for targeted strengthening or rehab.', tags: ['biomechanics', 'tricky', 'high-yield'] },
          { q: 'Concentric, eccentric, isometric — which produces most force?', a: 'Eccentric > Isometric > Concentric. Eccentric contractions produce ~120-150% of concentric max force at the same speed. Eccentric is also the most efficient (lowest oxygen cost per unit force) but causes the most muscle damage (DOMS). Foundation of accentuated eccentric training.', tags: ['biomechanics', 'tricky', 'high-yield'] },
          { q: 'Isokinetic vs isotonic vs isometric — definitions.', a: 'Isometric: muscle contracts, joint angle UNCHANGED (planks, holds, wall sits). Isotonic: muscle contracts under CONSTANT external load, joint angle changes (most weight training). Isokinetic: muscle contracts at CONSTANT VELOCITY (specialized machines like Cybex) — variable torque to match the curve. Not the same thing.', tags: ['biomechanics', 'tricky', 'high-yield'] },
          { q: 'Plyometric drill classifications.', a: 'Jumps in place: low intensity, vertical only (squat jumps). Standing jumps: single max effort (broad jump, vertical jump). Multiple hops/jumps: combination (multiple broad jumps). Bounds: maximum horizontal distance (bounding strides). Box drills: jumping onto/off boxes. Depth jumps: stepping off a box and immediately jumping (HIGH intensity — advanced athletes only).', tags: ['plyometrics', 'tricky', 'high-yield'] },
          { q: 'Plyometric drill volume guidelines.', a: 'Beginner: 80-100 foot contacts per session. Intermediate: 100-120. Advanced: 120-140. Intense drills like depth jumps: lower counts (10-30). Foot contacts > distance covered for tracking. 48-72 hours between intense plyo sessions. NSCA emphasizes contact counting over volume in time.', tags: ['plyometrics', 'tricky', 'high-yield'] },
          { q: 'What is the formula for jumping training progression contact counts?', a: 'Increase intensity (e.g., add resistance, increase box height) — NOT volume — for progression. Common progression: low → moderate → high → shock intensity drills. Don\'t jump volumes by >10% per week. Recovery is 48-72 hours for true plyometric work.', tags: ['plyometrics', 'high-yield'] },
          { q: 'Speed/sprint training — common volume guidelines.', a: 'Maximal sprints: 100-400 m total volume per session. Distances: 10-60 m for acceleration, 40-80 m for max speed. Full recovery between reps: 3-5+ min for 30-40m, 5-7+ min for longer sprints. NOT to be confused with conditioning sprints (shorter rest, more reps).', tags: ['speed', 'high-yield'] },
        ]
      },
      {
        id: 'must-know-mnemonics',
        title: 'Must-Know Mnemonics & Memory Aids',
        cards: [
          { q: 'Rotator cuff muscles — mnemonic and order.', a: 'SITS: Supraspinatus, Infraspinatus, Teres minor, Subscapularis. Supraspinatus on top. Infraspinatus and teres minor on back (external rotators). Subscapularis on front of scapula (internal rotator). All four center the humeral head in the glenoid.', tags: ['mnemonics', 'anatomy', 'high-yield'] },
          { q: 'Carpal bones mnemonic.', a: '"Some Lovers Try Positions That They Can\'t Handle." Proximal row (lateral to medial): Scaphoid, Lunate, Triquetrum, Pisiform. Distal row (lateral to medial): Trapezium, Trapezoid, Capitate, Hamate. Scaphoid is most commonly fractured.', tags: ['mnemonics', 'anatomy', 'high-yield'] },
          { q: 'Cranial nerves mnemonic.', a: '"On Old Olympus\' Towering Tops A Finn And German Viewed Some Hops." Olfactory, Optic, Oculomotor, Trochlear, Trigeminal, Abducens, Facial, Vestibulocochlear (Auditory), Glossopharyngeal, Vagus, Spinal Accessory, Hypoglossal. Order matters — they\'re numbered I-XII.', tags: ['mnemonics', 'anatomy'] },
          { q: 'Erector spinae mnemonic.', a: '"I Love Spaghetti" — Iliocostalis (most lateral), Longissimus (middle), Spinalis (most medial). From outside-in. Largest spinal extensor group; contributes to lateral flexion.', tags: ['mnemonics', 'anatomy', 'high-yield'] },
          { q: 'Pes anserinus tendons mnemonic.', a: '"Say Grace before Tea" — Sartorius, Gracilis, semiTendinosus. Three muscles whose tendons attach at the pes anserinus (the "goose foot") on the medial proximal tibia. All three flex the knee. Combined strain causes medial knee pain.', tags: ['mnemonics', 'anatomy'] },
          { q: 'The order of pre-exercise health screening per ACSM.', a: 'PAR-Q+ → identify CV/metabolic/renal disease + symptoms → identify desired exercise intensity → determine need for medical clearance. ACSM\'s "exercise pre-participation health screening algorithm" (2015 update — simpler than older multi-step risk stratification).', tags: ['safety', 'high-yield'] },
          { q: 'The "FITT-VP" principle.', a: 'Frequency (how often), Intensity (how hard), Time (duration), Type (mode), Volume (total work), Progression (advancing over time). The ACSM\'s standard prescription framework for exercise programs. All six must be addressed in a complete program.', tags: ['programming', 'high-yield'] },
          { q: 'Plyometric "amortization phase" — what is it?', a: 'The transition between the eccentric and concentric phases of a stretch-shortening cycle (SSC) movement. The SHORTER this phase, the more elastic energy is preserved and the more powerful the rebound. Training shortens amortization. Long amortization = lost elastic energy.', tags: ['plyometrics', 'high-yield'] },
          { q: 'What is the stretch-shortening cycle (SSC)?', a: 'A coupled muscle action: rapid eccentric pre-stretch → brief amortization (isometric pause) → powerful concentric contraction. Stores and releases elastic energy in muscle/tendon. Underlies all jumping, sprinting, throwing. Short SSC: <250 ms (sprint contact). Long SSC: >250 ms (countermovement jump).', tags: ['plyometrics', 'high-yield', 'foundational'] },
          { q: 'Common "trick question" — what muscle is NOT involved in...?', a: 'Common exam pattern: "Which muscle is NOT involved in the bench press?" or similar. The trap is usually a synergist or stabilizer the student doesn\'t connect to the movement. Best approach: name the prime movers, synergists, AND stabilizers for every major lift. Don\'t just memorize prime movers.', tags: ['exam-strategy', 'high-yield'] },
        ]
      },
    ]
  },
  phase18: {
    id: 'phase18',
    title: 'Phase XVIII — Image & Video Application',
    subtitle: 'The 30-40 visual questions that decide Practical/Applied',
    color: '#E63946',
    icon: 'Activity',
    description: 'The Practical/Applied section includes 30-40 image and video questions where you must identify form errors and prescribe corrections. This is where most candidates fail. You can\'t learn this from reading — you have to train your eye. Each card here teaches you what to LOOK FOR.',
    domains: [
      {
        id: 'squat-errors',
        title: 'Identifying Squat Errors in Images',
        cards: [
          { q: 'You see an athlete\'s heels rising off the floor during the squat descent. What\'s the cause and correction?', a: 'Cause: limited ankle dorsiflexion OR weight too far forward OR stance too narrow. Corrections in order of intervention: (1) widen stance and turn toes out more, (2) use weightlifting shoes or place small plates under heels TEMPORARILY, (3) add ankle mobility work (banded distractions, calf stretches), (4) reduce squat depth until mobility improves. NSCA position: address mobility — heel elevations are a temporary fix.', tags: ['image-question', 'squat', 'errors', 'practical', 'high-yield'] },
          { q: 'You see knee valgus (knees caving in) during a squat. What\'s the cause and correction?', a: 'Cause: weak hip abductors/external rotators (gluteus medius, deep external rotators) OR poor motor control OR limited ankle dorsiflexion forcing compensation. Corrections: cue "spread the floor" or "knees out" (external focus); add banded squats with knees pushing against a band; strengthen glute med (clamshells, side-lying abduction, lateral band walks); reduce load until pattern improves.', tags: ['image-question', 'squat', 'errors', 'practical', 'high-yield'] },
          { q: 'You see an excessive forward lean (chest collapsing) during a back squat. What\'s the cause?', a: 'Likely causes: (1) weak quadriceps relative to posterior chain, (2) limited ankle dorsiflexion forcing trunk forward, (3) weak core/upper back not maintaining neutral spine, (4) low-bar position naturally creates more forward lean. Corrections: front squat variations, paused squats, core work, ankle mobility. Check bar position — low-bar squats LOOK like forward lean but may be appropriate.', tags: ['image-question', 'squat', 'errors', 'practical', 'high-yield'] },
          { q: 'You see the hips rising faster than the shoulders out of the bottom of a squat ("good morning" fault). What\'s the cause?', a: 'Cause: weak quadriceps, posterior chain compensating; OR athlete sitting too far back; OR fatigue. Correction: cue "chest up, drive hips and shoulders together"; pause squats at parallel; tempo squats with slow ascent; reduce load. This is a strength imbalance — strengthen the quads with front squats and Bulgarian split squats.', tags: ['image-question', 'squat', 'errors', 'practical', 'high-yield'] },
          { q: 'You see "butt wink" (posterior pelvic tilt) at the bottom of a deep squat. Is this dangerous?', a: 'Mild butt wink under load is common and often non-problematic in skilled lifters. PROBLEMATIC if: occurs above parallel (very short ROM); excessive (significant lumbar flexion under heavy load); causes pain. Causes: limited hip flexion mobility, tight hamstrings, anatomy (deep hip socket). Correction: squat to a depth where neutral spine is maintained; hip mobility work; not necessarily a contraindication to squatting.', tags: ['image-question', 'squat', 'errors', 'practical', 'high-yield'] },
        ]
      },
      {
        id: 'deadlift-errors',
        title: 'Identifying Deadlift Errors',
        cards: [
          { q: 'You see a rounded lower back during the initial pull of a deadlift. Most urgent intervention?', a: 'STOP THE LIFT. This is the highest-injury-risk form error in strength training. Causes: load too heavy, weak core, limited hamstring/hip mobility, poor setup. Immediate intervention: reduce load by 30-50%. Then: cue "chest up, lats tight, take the slack out of the bar"; deadlift from blocks if mobility is the issue; hammer single-leg and posterior chain work; build from RDLs.', tags: ['image-question', 'deadlift', 'errors', 'safety', 'practical', 'high-yield'] },
          { q: 'You see the bar drifting away from the body during a deadlift. Cause?', a: 'Cause: lats not engaged ("not pulling the bar into the body"); hips too high at start; weak upper back. Corrections: cue "lats squeeze," "bar to body," "armpits over the bar"; check starting hip height (hips between knees and shoulders, NOT higher); strengthen rows and chin-ups; use snatch-grip RDLs to drill lat engagement.', tags: ['image-question', 'deadlift', 'errors', 'practical', 'high-yield'] },
          { q: 'You see hyperextension (leaning back) at the top of a deadlift lockout. Why is this an error?', a: 'Excessive lumbar hyperextension at lockout shifts shear forces to the spine and indicates poor positioning. Correct lockout: hips fully extended, glutes squeezed, shoulders directly OVER hips, ribcage stacked over pelvis — NOT leaning back. Cue: "stand tall, squeeze glutes" not "lean back." Common in CrossFit/competition lifters trying to "complete" the lift; not necessary or safe under heavy loads.', tags: ['image-question', 'deadlift', 'errors', 'practical', 'high-yield'] },
          { q: 'You see uneven shoulders or hip rotation during the pull. What\'s the issue?', a: 'Asymmetry indicates a strength imbalance, mobility restriction, or unconscious shift toward the dominant side. Test bilateral strength (single-leg RDLs, single-arm farmer carries) to find the weak side. Address with unilateral training. Limit bilateral loading until symmetric. NSCA position: asymmetries are an injury risk and should be addressed before progressing load.', tags: ['image-question', 'deadlift', 'errors', 'practical'] },
        ]
      },
      {
        id: 'oly-errors',
        title: 'Identifying Olympic Lift Errors',
        cards: [
          { q: 'You see an athlete reverse-curling the bar during the second pull of a power clean. What\'s happening and how do you fix it?', a: 'Athlete is using the arms BEFORE the legs/hips complete triple extension — pulling with arms instead of jumping. Cue: "elbows high and outside, but ONLY after the jump." Fix: practice clean pulls (just the pull, no catch) at lighter loads; emphasize "explode through, then pull"; sometimes drilling jump shrugs helps. The arms should be a "passive whip" not an active pull.', tags: ['image-question', 'olympic', 'errors', 'practical', 'high-yield'] },
          { q: 'You see early arm bend during the first pull of a clean. Why is this a critical error?', a: 'Early arm bend disconnects the bar from the powerful hip drive. The arms can\'t move the load as fast as the hips — bent arms during the first pull rob power. Cue: "long arms, hang from the bar" through the first pull. Practice clean deadlifts (no second pull) at moderate weight. Reset starting position if athlete habitually rushes.', tags: ['image-question', 'olympic', 'errors', 'practical', 'high-yield'] },
          { q: 'You see hips rising faster than the shoulders during the first pull of a clean. What\'s wrong?', a: 'Hips MUST stay back to keep the torso angle constant during the first pull. If hips rise first, the athlete becomes a stiff-leg deadlift — the second pull will be weak. Cause: starting hip position too low OR athlete is rushing. Cue: "torso angle stays constant," "shoulders over the bar." Slow the first pull deliberately.', tags: ['image-question', 'olympic', 'errors', 'practical', 'high-yield'] },
          { q: 'You see a soft catch (back rounding, hips dropping past quarter-squat) in a power clean. What\'s the issue?', a: 'Either (1) the second pull was insufficient — bar didn\'t get high enough, forcing a deeper catch, OR (2) the athlete lacks front-squat strength. Fix: prioritize improving second pull (jump shrugs, clean pulls); strengthen front squat. POWER clean catch should be at quarter-squat depth; deeper = either a squat clean (different lift) or technical failure.', tags: ['image-question', 'olympic', 'errors', 'practical', 'high-yield'] },
          { q: 'You see slow elbows in the catch position. What\'s the consequence?', a: 'Slow elbows mean the bar hits the shoulders before the elbows are up — bar crashes down, painful for wrists/shoulders, and unstable. Cue: "FAST elbows," "elbows up." Drill: tall muscle cleans and high pulls to ingrain the racking pattern at light weight. Without fast elbows, the athlete will never clean heavy.', tags: ['image-question', 'olympic', 'errors', 'practical', 'high-yield'] },
        ]
      },
      {
        id: 'press-pull-errors',
        title: 'Bench, OHP, and Pull Errors',
        cards: [
          { q: 'You see flared elbows (90° from torso) during a bench press. Why is this dangerous?', a: 'Flared elbows place excessive stress on the anterior shoulder capsule and increase risk of pec/shoulder injury. Correct elbow position: ~45-75° from torso (tucked). Cue: "elbows in," "break the bar over your chest." This single change reduces shoulder injury risk substantially. NSCA standard: forearms vertical at bottom position.', tags: ['image-question', 'bench', 'errors', 'safety', 'practical', 'high-yield'] },
          { q: 'You see the bar bouncing off the chest during a bench press. What\'s wrong?', a: 'Bouncing converts the lift to a partial momentum-driven lift, masks weakness, and risks rib/sternum injury. NSCA standard: pause briefly on chest (touch and go is acceptable but controlled). Cue: "control down, pause, press." If athlete can\'t pause, weight is too heavy. Paused bench builds bottom-end strength and eliminates the bounce.', tags: ['image-question', 'bench', 'errors', 'practical', 'high-yield'] },
          { q: 'You see the butt lifting off the bench during a bench press. Issue?', a: 'Disqualifies the rep in competition and reduces stability. Causes: weight too heavy, arch too aggressive, weak core. Cue: "press feet hard, but don\'t lift hips." Coaching: maintain 5-point body contact (head, upper back, glutes on bench; both feet on floor). Allow natural arch but no hip lift.', tags: ['image-question', 'bench', 'errors', 'practical'] },
          { q: 'You see the bar in front of the head (not stacked over shoulders) at lockout of an overhead press. Issue?', a: 'The lockout SHOULD have the bar directly over the mid-foot, with the head "punched through the window." If bar is forward, athlete has not fully extended thoracic spine, or pressed inefficiently. Cue: "punch your head through" at the top, "bar over ears." Correction also helps lock the shoulder safely.', tags: ['image-question', 'press', 'errors', 'practical', 'high-yield'] },
          { q: 'You see body english (hip extension, lower back arching) during a strict overhead press. What\'s happening?', a: 'Athlete is using leg/hip drive to help — this converts a strict press into an unintended push press. May be due to weight too heavy or fatigue. Cue: "feet locked, glutes squeezed, brace core." If the athlete needs leg drive, switch to a push press deliberately or reduce load.', tags: ['image-question', 'press', 'errors', 'practical'] },
          { q: 'You see chin not clearing the bar at the top of a pull-up. Does it count?', a: 'NSCA standard: chin MUST clear the top of the bar for a valid rep. If repeatedly failing to clear, the athlete is overcooking pull-up volume at too high a difficulty. Solutions: band-assisted pull-ups, eccentric-only pull-ups, ring rows progression. Don\'t accept partial reps — they ingrain incomplete patterns.', tags: ['image-question', 'pull-up', 'errors', 'practical'] },
        ]
      },
      {
        id: 'plyo-warmup-errors',
        title: 'Plyometric & Warm-Up Errors',
        cards: [
          { q: 'You see an athlete landing with knees collapsing inward (valgus) on a depth jump. Continue or stop?', a: 'STOP. Knee valgus on landing is an ACL injury risk factor and indicates the athlete is not ready for that intensity. Regress to lower-intensity plyometrics: jumps in place → standing jumps → multiple hops → bounds → THEN depth jumps. Address hip strength (glute med), landing mechanics ("knees out," "soft landing"), and ensure athlete has adequate base strength (≥1.5x BW back squat is NSCA recommendation for depth jumps).', tags: ['image-question', 'plyometrics', 'errors', 'safety', 'practical', 'high-yield'] },
          { q: 'What\'s the NSCA recommended strength prerequisite for high-intensity plyometrics like depth jumps?', a: 'Lower body: 1.5× body weight back squat. Upper body: 1.0× body weight bench press (for upper body plyos). This minimum strength base ensures the athlete can absorb landing forces. Don\'t prescribe depth jumps to untrained or undertrained athletes. The order of intensity progression: jumps in place → standing jumps → multiple hops → bounds → box jumps → depth jumps.', tags: ['plyometrics', 'safety', 'practical', 'high-yield'] },
          { q: 'You see a coach having athletes hold a static stretch for 60 seconds BEFORE a sprint workout. NSCA position?', a: 'NSCA position: prolonged static stretching (>60 sec per muscle) BEFORE explosive activity reduces force production and power output for up to 1 hour. Replace with: dynamic warm-up (leg swings, lunges with rotation, A-skips, butt kicks, gradual sprint build-ups) for 10-15 min. Save static stretching for AFTER training. This is a high-yield NSCA-specific position.', tags: ['warm-up', 'errors', 'nsca-position', 'practical', 'high-yield'] },
          { q: 'A basketball team is running a deceleration drill and the athletes take 8+ steps to stop from three-quarter speed. What change should you make?', a: 'Reduce intensity to allow proper deceleration mechanics: run at half speed and stop within 3 steps. Build deceleration capacity progressively. Excessive stopping distance indicates inadequate eccentric strength or motor control — going faster will only ingrain bad patterns. Progress: shorter distance / lower speed → longer distance / higher speed once mechanics are mastered. (This is an actual NSCA practice exam question.)', tags: ['image-question', 'speed-agility', 'errors', 'practical', 'high-yield'] },
        ]
      },
    ]
  },
  phase19: {
    id: 'phase19',
    title: 'Phase XIX — Scenario Synthesis & Program Design',
    subtitle: 'Athlete profile → Needs analysis → Program — the way the exam tests it',
    color: '#588157',
    icon: 'Brain',
    description: 'The Practical/Applied exam presents athlete profiles and asks you to synthesize needs analysis, training status, sport demands, and periodization into a single correct answer. This is where the application gap kills candidates. Each card here is a worked scenario in the style the exam uses.',
    domains: [
      {
        id: 'needs-analysis-cases',
        title: 'Needs Analysis Case Studies',
        cards: [
          { q: 'CASE: 19-year-old D1 sprinter, 100m specialist. Off-season. What energy system should DOMINATE her training?', a: 'Phosphagen system. The 100m is 9-12 seconds — almost entirely ATP-PC. Programming: heavy strength (≥85% 1RM, 1-5 reps), maximal effort speed (sprints 20-60m with FULL recovery — work:rest 1:12 to 1:20), explosive power (Olympic variants, plyometrics). Do NOT prescribe long aerobic work — interferes with neural and CP adaptations. This is "specificity of training" applied.', tags: ['scenario', 'needs-analysis', 'energy-systems', 'practical', 'high-yield'] },
          { q: 'CASE: Soccer midfielder, in-season, complaining of fatigue late in matches. Training prescription?', a: 'Midfielders cover 10-13 km per match with repeated high-intensity efforts (mixed energy systems). Maintain in-season minimums: 1-2 short strength sessions/week (30 min, high intensity, low volume), repeated-sprint work matching match demands (e.g., 6×40m with 30 sec rest × 3 sets), avoid heavy aerobic volume in-season. Address SLEEP and NUTRITION before adding more training. Test fatigue with sprint times, jump tests — don\'t just add training.', tags: ['scenario', 'needs-analysis', 'soccer', 'in-season', 'practical', 'high-yield'] },
          { q: 'CASE: Offensive lineman, 305 lbs, 1RM bench 405, 1RM squat 575, but slow off the snap. What\'s the priority?', a: 'Strength is adequate; power and rate of force development (RFD) are limiting. Off-season: maintain absolute strength (1-2 max-effort sessions/week) but emphasize POWER work — Olympic lifts (cleans, push-press), plyometrics, contrast/complex training (heavy squat → broad jump), starting strength drills (push out of stance). Body composition assessment may also help — excess fat without function is a liability.', tags: ['scenario', 'needs-analysis', 'football', 'practical', 'high-yield'] },
          { q: 'CASE: Female collegiate distance runner reports irregular periods, fatigue, recent stress fractures. What do you suspect and what\'s the immediate action?', a: 'RED-S (Relative Energy Deficiency in Sport) — formerly the Female Athlete Triad. Triad: low energy availability, menstrual dysfunction, low bone mineral density. IMMEDIATE: refer to sports medicine physician and registered dietitian. Reduce training load. This is OUTSIDE the S&C coach\'s scope to treat — recognize and refer. Continuing to train through this leads to serious long-term consequences (osteoporosis, infertility, cardiac issues).', tags: ['scenario', 'red-s', 'female-athlete', 'safety', 'practical', 'high-yield'] },
          { q: 'CASE: 14-year-old basketball player wants to "get strong like LeBron." Parents ask about creatine, heavy lifting. NSCA position?', a: 'Resistance training is SAFE and BENEFICIAL for youth when supervised. Start with technique mastery, bodyweight, and light external loads. Avoid maximal lifts (1RMs) and intense Olympic lifts until technique is excellent. Creatine in healthy adolescents: NSCA position is that evidence is limited but generally safe; not necessary at this age — food-first approach. Address LTAD principles: build movement foundation before specialization. Avoid early sport specialization (single-sport before age 12-14).', tags: ['scenario', 'youth', 'nsca-position', 'practical', 'high-yield'] },
        ]
      },
      {
        id: 'periodization-cases',
        title: 'Periodization Model Selection',
        cards: [
          { q: 'CASE: First-year novice powerlifter, training 8 months until competition. Which periodization model?', a: 'Linear (traditional) periodization. Why: novices respond well to simple progressive overload; long timeline allows clear phase progression (hypertrophy → strength → power → peak); novices don\'t need the variation that undulating provides. Model: 4 weeks GPP/hypertrophy → 8 weeks basic strength → 8 weeks max strength → 4 weeks peak/taper → competition.', tags: ['scenario', 'periodization', 'practical', 'high-yield'] },
          { q: 'CASE: Advanced powerlifter, 10 years experience, plateau on strength gains. Which periodization model?', a: 'Daily Undulating Periodization (DUP) or Block Periodization. Why: advanced athletes need MORE VARIATION than linear provides — they\'ve adapted to predictable progression. DUP: vary rep/load schemes across the week (e.g., Mon strength, Wed hypertrophy, Fri power). Block: 3-4 week focused blocks (accumulation → transmutation → realization). Research supports either for advanced lifters.', tags: ['scenario', 'periodization', 'practical', 'high-yield'] },
          { q: 'CASE: NBA player with 82-game season plus playoffs. Periodization approach?', a: 'In-season has fundamentally different demands than off-season. Approach: undulating maintenance (2 short sessions/week, alternating strength-focus and power-focus); auto-regulation based on game schedule and travel; emphasize RECOVERY (sleep, nutrition, soft tissue); the "training stimulus" is the GAMES — supplemental work just maintains qualities. Don\'t prescribe a fixed program — adapt week-by-week to schedule.', tags: ['scenario', 'in-season', 'periodization', 'practical', 'high-yield'] },
          { q: 'CASE: D1 football team, 12-month calendar with spring ball, summer camp, season. Where does the "preparatory period" fall?', a: 'Preparatory period = off-season + early pre-season. For football: typically January-July (post-bowl through training camp). Phases within preparatory: GPP (general physical preparedness, hypertrophy, 4-8 weeks) → SPP (sport-specific preparation, basic strength, 4-8 weeks) → max strength + power transition (4-6 weeks) → in-season maintenance. The competitive period = the actual season (August/September-December/January).', tags: ['scenario', 'periodization', 'football', 'practical', 'high-yield'] },
          { q: 'CASE: Track sprinter peaking for one championship in 16 weeks. Approach?', a: 'Classic Matveyev-style linear periodization with a peaking taper. Block structure: 6 weeks GPP/hypertrophy → 6 weeks max strength/power → 2-3 weeks competition prep → 1-2 week taper (reduce volume 40-60%, maintain intensity). The TAPER is critical for single-peak events — don\'t just stop training, deliberately reduce volume while keeping nervous system primed.', tags: ['scenario', 'periodization', 'sprinter', 'practical', 'high-yield'] },
        ]
      },
      {
        id: 'exercise-order',
        title: 'Exercise Order Decisions',
        cards: [
          { q: 'You\'re designing a workout: power clean, leg press, back squat, calf raise. What\'s the correct order?', a: 'NSCA exercise order: (1) Power clean (most explosive/highest skill — when nervous system is freshest), (2) Back squat (compound, multi-joint, large muscle mass), (3) Leg press (compound but less complex), (4) Calf raise (small muscle, single joint — last). Principle: most explosive/complex first, large to small muscle, multi-joint before single-joint. POWER before STRENGTH before HYPERTROPHY before ENDURANCE.', tags: ['exercise-order', 'programming', 'practical', 'high-yield', 'foundational'] },
          { q: 'PRINCIPLE: Why does NSCA recommend Olympic lifts FIRST in a workout?', a: 'Olympic lifts require maximal CNS activation, technical precision, and explosive power. Fatigue degrades technique and power output. Performing them first ensures: (1) safe technique, (2) maximal power adaptation, (3) reduced injury risk. Cleans/snatches/jerks AFTER squats compromises both — you\'ll lift heavier squats (fresh) but technically poor cleans (fatigued).', tags: ['exercise-order', 'programming', 'practical', 'high-yield'] },
          { q: 'PRINCIPLE: Push-pull-legs vs upper-lower vs total-body splits — which when?', a: 'TOTAL-BODY (2-3x/week): novices, busy schedules, in-season athletes maintaining qualities. UPPER-LOWER (4x/week): intermediate athletes balancing volume and frequency. PUSH-PULL-LEGS (5-6x/week): advanced lifters maximizing per-muscle volume. Bodybuilders. NOT for athletes — too sport-irrelevant. Frequency per muscle group: novices 3x/wk, intermediate 2x/wk, advanced 1-2x/wk per muscle.', tags: ['programming', 'practical', 'high-yield'] },
          { q: 'SCENARIO: Athlete has 60 minutes per session, 3 days/week. Prioritize what?', a: 'Compound multi-joint movements only. Sample: Day 1 — squat, bench, row, plank. Day 2 — deadlift, OHP, pull-up, carries. Day 3 — power clean, front squat, dip, core. Cut isolation work, cut machine work, cut "fluff." Time is the constraint — prioritize highest ROI exercises. Single-joint work only if specific weakness needs addressing.', tags: ['scenario', 'time-constrained', 'practical'] },
        ]
      },
      {
        id: 'special-cases',
        title: 'Tricky Athlete-Specific Cases',
        cards: [
          { q: 'CASE: Athlete returning from ACL reconstruction at 6 months post-op. Cleared for "running" by surgeon. Programming?', a: 'Surgical clearance ≠ return to sport. Return to performance is a PROGRESSIVE process. At 6 months: light jogging in straight lines, double-leg jumping, controlled lateral movements with NO sharp cuts. Build progressively: linear → curved → angular → reactive cutting. Use objective criteria for progression: limb symmetry index (LSI ≥90% on hop tests), strength testing (≥85% of uninjured side). Return to sport typically 9-12+ months post-op. Coordinate with PT/ATC.', tags: ['scenario', 'return-to-play', 'safety', 'practical', 'high-yield'] },
          { q: 'CASE: Female athlete reports painful shin pain after track season. Diagnosis to consider?', a: 'Medial Tibial Stress Syndrome (MTSS — "shin splints") most likely. Risk factors: rapid mileage increase, poor footwear, hard surfaces, biomechanical issues (overpronation, weak hip abductors). However, ALWAYS consider stress fracture — REFER to physician if pain is focal, persistent, worsens with each step, or wakes athlete at night. S&C role: load management (reduce running volume), strengthen tib anterior, hip abductors, calves; address footwear; not to diagnose.', tags: ['scenario', 'injury-recognition', 'referral', 'practical'] },
          { q: 'CASE: Master\'s athlete (55-year-old powerlifter) competing in nationals. Considerations beyond standard programming?', a: 'Older athletes need: (1) longer warm-ups (15-20 min), (2) more recovery between heavy sessions (72+ hours), (3) reduced TOTAL volume (recovery capacity declines with age), (4) maintained intensity (heavy loads still elicit adaptation), (5) joint health prioritized — more variability in exercises, more isolation work to address weaknesses, (6) BP and CV screening before max attempts. Strength CAN be maintained well past 55 with appropriate programming.', tags: ['scenario', 'masters-athlete', 'older-adults', 'practical'] },
          { q: 'CASE: T1 diabetic high school athlete on insulin. Pre-workout considerations?', a: 'Check blood glucose BEFORE exercise: <100 mg/dL → consume carbs first; 100-250 → safe to exercise; >250 with ketones → DO NOT exercise (DKA risk). Have rapid-acting carbs available (juice, glucose tabs). Insulin dose may need adjustment with regular training (consult athlete\'s medical team). Recognize hypoglycemia signs: shaking, sweating, confusion, irritability — STOP, give carbs immediately. Educate teammates and coaches. This is in NSCA scope when athlete is medically managed.', tags: ['scenario', 'diabetes', 'special-pops', 'safety', 'practical', 'high-yield'] },
          { q: 'CASE: Pre-season conditioning session — athlete reports chest pain and tightness. Action?', a: 'STOP exercise immediately. Sit athlete down. Activate Emergency Action Plan (EAP). Call 911 if symptoms persist >5 min, severe, or accompanied by other cardiac signs (jaw/arm pain, shortness of breath, nausea, dizziness). DO NOT continue training. DO NOT minimize. Athletes can have undiagnosed cardiac conditions (HCM, arrhythmias, anomalous coronary). NSCA standard: erring on caution is always correct. Document the incident.', tags: ['scenario', 'emergency', 'safety', 'practical', 'high-yield', 'foundational'] },
        ]
      },
    ]
  },
  phase20: {
    id: 'phase20',
    title: 'Phase XX — NSCA Positions & Exam Strategy',
    subtitle: 'The NSCA answer vs the school answer + time management',
    color: '#003049',
    icon: 'Target',
    description: 'The exam wants the NSCA answer, even when it conflicts with what your professor or other certifications say. This phase locks in NSCA-specific positions on controversial topics, plus time management, question-strategy, and policy details (retake rules, 2030 CASCE requirement) that protect you on exam day.',
    domains: [
      {
        id: 'nsca-positions',
        title: 'NSCA-Specific Positions (Controversial Topics)',
        cards: [
          { q: 'NSCA position on optimal squat depth.', a: 'NSCA: at least PARALLEL — hip crease at or below the top of the knee. Going deeper (ATG) is safe when mobility allows and may improve hypertrophy/strength benefits. NOT going to parallel ("quarter squats") is generally NOT supported except in specific sport-specific contexts (e.g., final-phase strength for football lineman). Choose PARALLEL on exam unless the question specifies a context requiring otherwise.', tags: ['nsca-position', 'squat', 'practical', 'high-yield'] },
          { q: 'NSCA position on stretching BEFORE activity.', a: 'NSCA: DYNAMIC warm-up before activity. Prolonged static stretching (>60 sec per muscle) before explosive/strength work REDUCES force production for up to 1 hour. Static stretching is reserved for POST-workout or as a standalone flexibility session. Brief (<30 sec) static stretches as part of a comprehensive warm-up are acceptable. On exam: choose dynamic warm-up before explosive activity.', tags: ['nsca-position', 'warm-up', 'practical', 'high-yield'] },
          { q: 'NSCA position on youth resistance training.', a: 'NSCA: SAFE and BENEFICIAL when properly supervised, programmed, and progressed. The "stunts growth" myth is NOT supported. Recommendations: technique first, light loads, higher reps (8-15+), 1-3 sets, AVOID maximal (1RM) lifts in pre-pubertal children, supervised by qualified coach. Most strength gains pre-puberty are neural. Exam answer: youth resistance training is SAFE when properly conducted.', tags: ['nsca-position', 'youth', 'practical', 'high-yield'] },
          { q: 'NSCA position on Olympic lifts for general athletes.', a: 'NSCA STRONGLY ADVOCATES for Olympic lifts (clean, snatch, jerk, and derivatives) for athletic populations because they: develop power and RFD, train triple extension (foundational athletic movement), are highly transferable to sport, build full-body coordination. The "Olympic lifts are too dangerous/complex" position is NOT NSCA. Exam: Oly lifts and derivatives are RECOMMENDED for athletes.', tags: ['nsca-position', 'olympic-lifts', 'practical', 'high-yield'] },
          { q: 'NSCA position on aerobic-strength concurrent training.', a: 'Concurrent training (aerobic + strength) DOES interfere with strength/power gains — the "interference effect." Mitigation: separate sessions by ≥6-9 hours when possible; if same session, perform STRENGTH FIRST; reduce aerobic volume during strength-focused phases. NSCA does NOT recommend avoiding aerobic training for strength athletes — just manage the dosage. For most athletes, both qualities are needed.', tags: ['nsca-position', 'concurrent', 'practical', 'high-yield'] },
          { q: 'NSCA position on the Valsalva maneuver during lifting.', a: 'Valsalva (forceful exhalation against closed glottis, creating intra-abdominal pressure) is APPROPRIATE for max-effort lifts in healthy trained athletes — it stabilizes the spine. CAUTIONS: increases blood pressure dramatically (avoid in hypertensives), may cause dizziness/blackout if prolonged, NOT for novices or high-rep sets. Exam answer: Valsalva is appropriate for HEAVY LIFTS in TRAINED HEALTHY athletes, NOT a universal recommendation.', tags: ['nsca-position', 'safety', 'practical', 'high-yield'] },
          { q: 'NSCA position on plyometric volume measurement.', a: 'Track plyometrics by FOOT CONTACTS, not by time or sets×reps. Volume guidelines: Beginner 80-100 contacts/session, Intermediate 100-120, Advanced 120-140. High-intensity drills (depth jumps): 10-30 contacts only. 48-72 hours recovery between intense plyometric sessions. Exam answer: foot contacts is the NSCA standard.', tags: ['nsca-position', 'plyometrics', 'practical', 'high-yield'] },
          { q: 'NSCA position on body composition methods for athletes.', a: 'Hierarchy of accuracy: Hydrostatic weighing / DEXA > BodPod > Skinfolds > BIA > visual estimation. SKINFOLDS are the most COMMON and PRACTICAL for S&C settings — cheap, portable, repeatable. Use the Jackson-Pollock 3-site or 7-site protocols. AVOID single bioimpedance scales (highly affected by hydration). On exam: skinfolds are typically the BEST PRACTICAL answer for field testing.', tags: ['nsca-position', 'body-comp', 'testing', 'practical', 'high-yield'] },
          { q: 'NSCA position on rest periods for strength training.', a: 'Strength (≥85% 1RM): 2-5 MINUTES rest. Power (heavy Oly): 2-5 minutes. Hypertrophy: 30-90 seconds. Endurance: ≤30 seconds. The exam frequently tests this — shorter rest does NOT enhance strength adaptation. Athletes need full ATP-PC recovery to express maximum strength on the next set. Choosing "1 minute rest" for a strength question is almost always WRONG.', tags: ['nsca-position', 'rest', 'practical', 'high-yield'] },
        ]
      },
      {
        id: 'time-management',
        title: 'Exam Day Time Management',
        cards: [
          { q: 'Scientific Foundations: how much time per question?', a: '80 scored + 15 unscored = 95 questions in 90 minutes (1.5 hours) = ~57 seconds per question average. The unscored pilot questions are INDISTINGUISHABLE — answer all with equal effort. Aim for 1 minute per question to leave time for flagged-question review. Pacing: 30 questions per 30 minutes = on track.', tags: ['exam-strategy', 'time-management', 'high-yield'] },
          { q: 'Practical/Applied: how much time per question?', a: '110 scored + 15 unscored = 125 questions in 150 minutes (2.5 hours) = ~72 seconds per question. With 30-40 image/video questions taking longer, plan ~60 seconds for easy questions and ~2 minutes for image-based scenarios. Pacing: about 40 questions per 50 minutes.', tags: ['exam-strategy', 'time-management', 'high-yield'] },
          { q: 'Strategy: what to do with a question taking >2 minutes?', a: 'FLAG IT and MOVE ON. Pick the best answer based on first instinct, flag for review, return at the end. Do NOT spend 4 minutes on one question while leaving 4 other questions unanswered at the end. Time pressure is real on the CSCS — every flagged question must be revisited, but quick movement preserves overall score.', tags: ['exam-strategy', 'time-management', 'high-yield'] },
          { q: 'Strategy: multiple-choice elimination approach.', a: '(1) Read the question stem fully. (2) BEFORE looking at options, anticipate the answer. (3) Read all four options. (4) Eliminate clearly wrong options first. (5) For the remaining options, identify which BETTER answers what the stem asked. (6) Watch for "EXCEPT," "NOT," "MOST," "LEAST" qualifiers — they reverse the answer.', tags: ['exam-strategy', 'high-yield'] },
          { q: 'Strategy: when two answers look correct.', a: 'CSCS questions often have two "almost right" options where ONE is more specific/correct. Ask: (1) which is more NSCA-aligned? (2) which addresses ALL parts of the stem? (3) which is the most COMPLETE answer? When unsure, pick the answer that aligns with NSCA Essentials of Strength Training and Conditioning text positions — not what you learned in school or other certifications.', tags: ['exam-strategy', 'high-yield'] },
        ]
      },
      {
        id: 'policy-rules',
        title: 'Policy & Rules That Could Trip You Up',
        cards: [
          { q: '2030 CASCE-accredited degree requirement — what is it and when?', a: 'Starting in 2030, NSCA will require a degree from a CASCE-accredited (Council on Accreditation of Strength and Conditioning Education) program — not just any bachelor\'s degree — to sit for the CSCS. CURRENT CSCS holders before December 31, 2029 are GRANDFATHERED IN (existing credentials unaffected). International candidates have until January 2036. CRITICAL: if you fail repeatedly and the deadline passes, you may lose eligibility if your degree is not from a CASCE-accredited program.', tags: ['policy', 'eligibility', 'critical', 'high-yield'] },
          { q: 'Retake policy — wait time and costs.', a: 'Wait period: 90 days minimum between failed attempts. Costs (2026): Both sections retake = $340 member / $475 non-member; Single section retake = $250 member / $385 non-member. Can retake ONLY the failed section if you passed one. NSCA membership ($130/year) pays for itself after one retake.', tags: ['policy', 'retake', 'high-yield'] },
          { q: 'Passed section validity period — the trap that catches people.', a: 'If you pass one section but fail the other, your PASSED SECTION SCORE IS VALID FOR ONLY 1 YEAR. After that, you must retake BOTH sections. Plan retakes accordingly — if you pass Sci Foundations on attempt 1 in January, you have until next January to pass Practical/Applied or you lose Sci Foundations too. This catches candidates who take long breaks between attempts.', tags: ['policy', 'retake', 'critical', 'high-yield'] },
          { q: 'Practice exam readiness benchmark — when to schedule the retake.', a: 'Don\'t schedule until you consistently score: 75%+ on full-length practice exams (aim 80%), 75%+ on Sci Foundations practice, 70%+ on Practical/Applied practice (harder section), no single domain below 65%, AND you\'ve hit 75%+ on THREE consecutive practice exams. If you\'re below these, you\'re not ready — money saved by waiting > money spent on premature retakes.', tags: ['exam-strategy', 'retake', 'high-yield'] },
          { q: 'On exam day — what can you bring? What\'s prohibited?', a: 'ALLOWED: government-issued photo ID, exam confirmation, NSCA-provided scratch paper (collected at end). PROHIBITED: phones, smart watches, calculators (none provided for CSCS — basic math only), notes, hats, food/drink in testing area. Arrive 30 min early for check-in. Bathroom breaks count against your time. Plan accordingly.', tags: ['exam-day', 'policy', 'high-yield'] },
          { q: 'NSCA non-scored pilot questions — what do you need to know?', a: '15 pilot (unscored) questions per section, embedded throughout — INDISTINGUISHABLE from scored. They\'re testing future questions for validity. You CAN\'T tell which are pilots, so answer ALL with full effort. This is why "easy" or "weird" questions still need your full attention. Don\'t waste mental energy guessing which are pilots.', tags: ['exam-day', 'high-yield'] },
        ]
      },
      {
        id: 'application-bridge',
        title: 'The Application Bridge — Closing the Gap',
        cards: [
          { q: 'KEY INSIGHT: Why the Practical/Applied has a 44% pass rate vs Sci Foundations 68%.', a: 'Sci Foundations is RECALL-based — you read it, you can answer. Practical/Applied is APPLICATION-based — knowing facts isn\'t enough; you must SYNTHESIZE multiple concepts into a real-world decision. Textbooks alone don\'t prepare you for this. The fix: for every fact you learn, ask "How would this change my program for Athlete X?" Build the bridge from knowledge to application.', tags: ['exam-strategy', 'application', 'critical', 'high-yield'] },
          { q: 'PRACTICE PROMPT: Energy system selection.', a: 'For every energy system fact you memorize, ask: "What sport, position, or training scenario does this apply to?" Phosphagen (0-6 sec) → 100m sprinter, max-effort lift, golf swing, baseball swing. Fast glycolysis (6-30 sec) → 400m runner, hockey shift end, soccer breakaway. Aerobic (>2 min) → distance running, soccer midfielder over 90 min. THIS is how application questions are answered.', tags: ['application', 'energy-systems', 'high-yield'] },
          { q: 'PRACTICE PROMPT: Periodization model selection framework.', a: 'For any athlete profile, ask: (1) Training age? Novice → linear. Advanced → undulating or block. (2) Timeline to competition? Long (12+ weeks) → linear feasible. Short → block. (3) Number of peaks? One → linear with taper. Multiple → block. (4) Sport demands stable or variable? Stable → linear. Variable → undulating. Walk through this framework — don\'t memorize answers.', tags: ['application', 'periodization', 'high-yield'] },
          { q: 'PRACTICE PROMPT: Exercise selection for sport.', a: 'For every exercise, ask: "Does this match the BIOMECHANICS (movement pattern, joint angles, force vectors) and BIOENERGETICS (energy system, duration) of the sport?" Soccer needs deceleration → eccentric work, RDLs, Nordic curls. Football lineman needs starting strength → push-press, broad jumps, sled pushes. Volleyball needs vertical → squat, clean, depth jumps. Match exercise to demand.', tags: ['application', 'exercise-selection', 'high-yield'] },
          { q: 'PRACTICE PROMPT: When a question seems ambiguous — what to do?', a: 'CSCS exam questions test the BEST answer, not the only right answer. When two seem correct: (1) which is more NSCA-specific? (2) which is more conservative/safe? (3) which addresses the WHOLE stem? (4) which would the textbook author (Haff and Triplett) most likely pick? Default to NSCA-aligned, safety-conservative, and complete answers when uncertain.', tags: ['exam-strategy', 'application', 'high-yield'] },
          { q: 'MENTAL MODEL: How to think about the exam.', a: 'You are not being tested on what you read — you are being tested on whether you can FUNCTION AS A CSCS. Every question simulates a real coaching decision. Channel the mindset: "I am the head S&C coach. What\'s the BEST decision here based on NSCA principles?" This frame eliminates guessing and channels your studying into practical reasoning.', tags: ['exam-strategy', 'mindset', 'high-yield'] },
        ]
      },
    ]
  },
  phase21: {
    id: 'phase21',
    title: 'Phase XXI — Elite Coaching & Sport Science',
    subtitle: 'What separates good coaches from great ones',
    color: '#1B4332',
    icon: 'Sparkles',
    description: 'Beyond the CSCS — the athlete monitoring, advanced periodization, force-velocity science, volume landmarks, and career knowledge that separates a certified coach from an elite one. Not tested on the CSCS exam, but essential for high-level professional practice.',
    domains: [
      {
        id: 'athlete-monitoring',
        title: 'Athlete Monitoring Technology',
        cards: [
          { q: 'What is HRV and how is it used for athlete monitoring?', a: 'Heart Rate Variability (HRV) = beat-to-beat variation in heart rate, reflecting autonomic nervous system balance. HIGH HRV = parasympathetic dominance = well-recovered. LOW HRV = sympathetic dominance = under-recovered or stressed. Measure each morning at the same time (resting). Apps: WHOOP, HRV4Training, Polar. Use TRENDS over days/weeks, not single readings. An athlete whose HRV drops 10-15% below their rolling average is a candidate for load reduction that day.', tags: ['monitoring', 'elite-coaching', 'high-yield'] },
          { q: 'What is Velocity-Based Training (VBT)?', a: 'Devices (GymAware, Vitruve, Tendo Unit, Push Band) measure bar velocity in real time using accelerometers or LPTs. This allows: (1) autoregulation — stop sets when velocity drops below a threshold; (2) load prescription by velocity zone rather than fixed % 1RM; (3) objective readiness monitoring (same load, lower velocity = poor readiness). The minimum velocity threshold (MVT) at which an athlete maintains a given velocity zone dictates loading.', tags: ['monitoring', 'vbt', 'elite-coaching', 'high-yield'] },
          { q: 'What are the VBT velocity zones?', a: 'Strength / Absolute strength: <0.5 m/s. Strength-speed: 0.5-0.75 m/s. Power (peak power zone): 0.75-1.0 m/s. Speed-strength: 1.0-1.3 m/s. Absolute speed: >1.3 m/s. Training in each zone develops specific qualities on the force-velocity curve. A 1RM squat at 0.3 m/s; a power clean at ~1.0-1.3 m/s; a loaded jump at 1.5+ m/s.', tags: ['monitoring', 'vbt', 'elite-coaching', 'high-yield'] },
          { q: 'What is a velocity loss threshold and why use it?', a: 'A preset % drop in bar velocity that signals set termination. Example: stop each set when velocity drops >20% from the fastest rep. At 20% velocity loss: significant strength stimulus with moderate fatigue; at 40% loss: maximum hypertrophy stimulus but high fatigue. Using velocity loss thresholds prevents accumulating excessive fatigue on poor-readiness days, and allows auto-regulated volume without fixed set/rep prescriptions.', tags: ['monitoring', 'vbt', 'elite-coaching', 'high-yield'] },
          { q: 'How are force plates used for athlete monitoring?', a: 'Force plates measure ground reaction force (GRF) over time. Two primary uses: (1) PERFORMANCE TESTING — countermovement jump (CMJ), squat jump (SJ), drop jump → metrics: peak force, jump height, reactive strength index (RSI), rate of force development; (2) DAILY READINESS — a 5-10 second CMJ protocol takes 60 seconds and provides RSI, peak force, and asymmetry data. Significant drops from an athlete\'s baseline signal reduced neuromuscular readiness.', tags: ['monitoring', 'force-plates', 'elite-coaching', 'high-yield'] },
          { q: 'What is Reactive Strength Index (RSI) and how is it interpreted?', a: 'RSI = Jump Height ÷ Ground Contact Time. Measures the quality of the stretch-shortening cycle under reactive conditions. A high RSI means the athlete rebounds quickly and powerfully. Used in: drop jump testing, repeated hop testing. As a daily readiness metric: RSI that falls >10-15% below an athlete\'s baseline indicates insufficient neuromuscular recovery — reduce plyometric and sprint volume for that session.', tags: ['monitoring', 'force-plates', 'rsi', 'elite-coaching', 'high-yield'] },
          { q: 'What do GPS and accelerometers track in team sport athletes?', a: 'Devices (Catapult, STATSports, PlayerTek) worn in a vest track: total distance, high-speed running distance (>5.5 m/s), sprint distance (>7 m/s), number of accelerations/decelerations, peak speed, player load (tri-axial accelerometer). This EXTERNAL LOAD data allows coaches to periodize field-based conditioning with the same rigor as the weight room — avoiding the spike in weekly workload (>10% week-to-week) that increases injury risk.', tags: ['monitoring', 'gps', 'elite-coaching', 'high-yield'] },
          { q: 'What is a subjective wellness questionnaire and why is it valuable?', a: 'A 5-question daily check-in: fatigue, sleep quality, muscle soreness, mood, stress (each rated 1-5). Takes 30 seconds. Correlates strongly with objective HRV data. Used to catch athletes who are under-recovered before they train. Advantages: free, simple, builds athlete self-awareness. Key insight: ask athletes the SAME questions each day at the SAME time — trends matter, not single scores.', tags: ['monitoring', 'wellness', 'elite-coaching'] },
        ]
      },
      {
        id: 'force-velocity-profiling',
        title: 'Force-Velocity Profiling & RSI',
        cards: [
          { q: 'What is an individual Force-Velocity (F-V) profile?', a: 'Every athlete sits somewhere on the force-velocity curve. Morin & Samozino\'s profiling method determines whether an athlete is FORCE-DEFICIENT (needs more absolute strength work) or VELOCITY-DEFICIENT (needs more speed/power/plyometric work) based on their jump or sprint testing data. Two athletes with the same vertical jump may need completely different training emphases — F-V profiling individualizes that decision with data.', tags: ['fv-profiling', 'elite-coaching', 'high-yield'] },
          { q: 'How is a sprint-based F-V profile assessed?', a: 'Morin & Samozino method: athlete performs maximal sprint (40-60m) with radar gun or timing gates at intervals. Software calculates: maximum theoretical force (F0), maximum theoretical velocity (V0), peak power (Pmax), and F-V slope. A steep negative slope = force-oriented athlete. A flat slope = velocity-oriented. Optimal slope exists at each sport/position level. Prescriptions follow: force-deficient → heavy strength/plyometrics; velocity-deficient → sprint training, loaded jumps, overspeed.', tags: ['fv-profiling', 'elite-coaching', 'high-yield'] },
          { q: 'How is a jump-based F-V profile assessed?', a: 'Athlete performs squat jumps at multiple loads (bodyweight, +20 kg, +40 kg, etc.). Velocity at each load is measured. The relationship between load and velocity is plotted — the slope defines the profile. Vertical F-V profiling is sport-relevant for jumping athletes (basketball, volleyball, track/field). Horizontal profiling (sprint-based) is more relevant for sprinters and field sport athletes.', tags: ['fv-profiling', 'elite-coaching', 'high-yield'] },
          { q: 'What does it mean when an athlete is "force-deficient" on their F-V profile?', a: 'They can produce velocity but lack the force end of the curve — typically a lighter, faster athlete who lacks absolute strength. Training priority: shift F-V profile toward force — increase 1RM squat/deadlift/hip thrust, heavy loaded jumps, heavier Olympic pull derivatives. This shifts the curve left and raises peak power without losing velocity capacity.', tags: ['fv-profiling', 'elite-coaching'] },
          { q: 'What does it mean when an athlete is "velocity-deficient" on their F-V profile?', a: 'They are relatively strong but can\'t express that strength at high speeds — typically a strong, heavy athlete who lacks RFD and explosive power. Training priority: shift toward velocity — plyometrics, contrast training, overspeed sprints, lighter loaded jumps with maximal intent, medicine ball throws. Maintain strength but add velocity-end work.', tags: ['fv-profiling', 'elite-coaching'] },
        ]
      },
      {
        id: 'volume-landmarks',
        title: 'Volume Landmarks & Hypertrophy Science',
        cards: [
          { q: 'What are Minimum Effective Volume (MEV), Maximum Adaptive Volume (MAV), and Maximum Recoverable Volume (MRV)?', a: 'Framework developed by Dr. Mike Israetel (Renaissance Periodization). MEV: fewest sets per muscle per week that still produces progress (typically 4-8 sets for most muscles). MAV: the volume range producing optimal results (typically 10-20 sets/muscle/week for trained lifters). MRV: maximum sets recoverable before performance drops (often 20-30+ depending on the individual and muscle). These shift across training phases and individual recovery capacity.', tags: ['volume-landmarks', 'hypertrophy', 'elite-coaching', 'high-yield'] },
          { q: 'How are volume landmarks applied in program design?', a: 'Start a hypertrophy phase at MEV. Progress weekly toward MAV. When recovery suffers (performance drops, joint pain, persistent soreness), you are approaching MRV — schedule a deload to reset. The next block starts at MEV again. Volume landmarks are INDIVIDUAL and MUSCLE-SPECIFIC — lats may have a higher MRV than rear delts. Track per-muscle volume weekly and adjust based on feedback.', tags: ['volume-landmarks', 'hypertrophy', 'elite-coaching', 'high-yield'] },
          { q: 'How do MEV/MAV/MRV change by training phase?', a: 'Strength blocks: lower volume overall (per Prilepin\'s Table); MEV drops, MRV drops. Hypertrophy blocks: highest volume; MAV is prioritized. In-season: maintain with MEV (minimum stimulus to avoid detraining). Deload: sub-MEV for 1 week to dissipate fatigue. The framework allows precise volume management across a macrocycle without under- or overloading any muscle group.', tags: ['volume-landmarks', 'periodization', 'elite-coaching'] },
          { q: 'What is "junk volume" and why does it matter?', a: 'Sets performed too far from failure to provide a meaningful hypertrophy stimulus — typically RPE <6, RIR >5+. These sets accumulate fatigue (CNS, systemic, local) without driving adaptation. Elite coaches eliminate junk volume: every working set is taken within 1-4 RIR. This raises training quality and allows more productive sets before hitting MRV.', tags: ['volume-landmarks', 'hypertrophy', 'elite-coaching', 'high-yield'] },
        ]
      },
      {
        id: 'advanced-periodization',
        title: 'Advanced Periodization Models',
        cards: [
          { q: 'What is Triphasic Training (Cal Dietz)?', a: 'A 3-block sequential model targeting specific neuromuscular phases: Block 1 — Eccentric (3-5 second lowering; maximizes elastic tissue strength and force absorption). Block 2 — Isometric (3-5 second pause at the bottom; maximizes tendon stiffness and motor unit recruitment under load). Block 3 — Concentric (explosive intent; transfers tissue strength to sport power). Blocks typically 3 weeks each; full cycle ~9-12 weeks. Used at high school through NFL level.', tags: ['periodization', 'triphasic', 'elite-coaching', 'high-yield'] },
          { q: 'What is the theoretical basis of Triphasic Training?', a: 'Every sport movement involves a triphasic muscle action (eccentric-isometric-concentric). Dietz argues that most programs train the concentric phase but neglect eccentric and isometric qualities that actually limit performance. By concentrating training on each phase sequentially, you systematically develop the full athletic force-production sequence. Research supports: eccentric overload reduces injury risk, isometric training increases tendon stiffness, and the sequential approach transfers well to jump, sprint, and power outputs.', tags: ['periodization', 'triphasic', 'elite-coaching'] },
          { q: 'What is the Conjugate/Concurrent method in depth?', a: 'Originally Soviet conjugate sequencing; popularized by Louie Simmons (Westside Barbell). Structure: MAX EFFORT day (work up to 1-3RM on a rotating compound movement, changed every 1-3 weeks to prevent accommodation) + DYNAMIC EFFORT day (50-60% 1RM + accommodating resistance, 8-12 sets × 2-3 reps, maximal bar speed). Both upper and lower body trained twice weekly each. Requires high training age — not appropriate for beginners.', tags: ['periodization', 'conjugate', 'elite-coaching', 'high-yield'] },
          { q: 'What is accommodating resistance and how is it used?', a: 'Bands or chains added to a barbell so resistance increases through the range of motion. Effect: matches the ascending strength curve (lifters are weakest at the bottom, strongest at lockout). Benefits: (1) removes the "deceleration phase" at the top; (2) overloads the strongest portion; (3) teaches acceleration through the full ROM; (4) increases bar speed and RFD. Used primarily in dynamic effort work (conjugate), accommodating bands at 25-35% of total load.', tags: ['periodization', 'accommodating-resistance', 'elite-coaching', 'high-yield'] },
          { q: 'What is the Accumulation-Transmutation-Realization (ATR) model?', a: 'Verkhoshansky and Issurin\'s block periodization model. Accumulation: 3-4 weeks, high volume, lower intensity — builds work capacity and hypertrophy foundation. Transmutation: 3-4 weeks, moderate volume, higher intensity — converts physical capacity into sport-specific strength. Realization: 2-3 weeks, low volume, peak intensity — expresses strength as power and speed; includes competition prep and taper. Used widely in elite track/field, Olympic lifting, and team sport peaking.', tags: ['periodization', 'block', 'elite-coaching', 'high-yield'] },
          { q: 'What is an Annual Training Plan (ATP) and why does it matter?', a: 'A macro-level calendar that maps ALL training phases, competition schedule, and recovery periods across a full year (or Olympic quadrennial). Building a real ATP requires: knowing the competition calendar (when are the key peaks?), understanding sport demands, managing multi-sport schedules, and coordinating with sport coaches. Average coaches write 4-week programs. Elite coaches think in years and coordinate everything with precision — the ATP is the strategic blueprint.', tags: ['periodization', 'annual-plan', 'elite-coaching', 'high-yield'] },
        ]
      },
      {
        id: 'sport-demands',
        title: 'Sport Demands Analysis',
        cards: [
          { q: 'What is a sport demands analysis and how do you conduct one?', a: 'A systematic breakdown of what a sport actually requires physically. Steps: (1) Time-motion analysis — average play duration, work:rest ratios, total time; (2) Energy system profile — which systems dominate? (3) Movement pattern analysis — dominant planes, joint angles, force vectors; (4) Injury epidemiology — what tissues are most stressed and most commonly injured? (5) Position-specific differences. All five inform exercise selection, conditioning methods, and injury prevention priorities.', tags: ['sport-demands', 'elite-coaching', 'high-yield'] },
          { q: 'Sport demands: American football by position.', a: 'Skill positions (WR, DB, RB): phosphagen dominant, 4-8 sec bursts, acceleration/deceleration, COD; train max speed, power, and repeated sprint capacity. Linemen: phosphagen + isometric force, contact, lateral movement; train absolute strength, power, lateral agility. Overall: ~30-40 explosive efforts per game with full recovery between plays — almost entirely ATP-PC with aerobic recovery base.', tags: ['sport-demands', 'football', 'elite-coaching', 'high-yield'] },
          { q: 'Sport demands: soccer.', a: '90+ minutes, 10-12 km total distance (midfielders > defenders/forwards). Aerobic base essential (VO2max 55-65+ for elite). ~150-200 high-intensity efforts per game, ~30-50 sprints. High-intensity running decreases in 2nd half — glycogen depletion. Key physical qualities: aerobic capacity, repeated sprint ability, COD speed, lower-body power. Injury priority: hamstring, ACL (females), ankle.', tags: ['sport-demands', 'soccer', 'elite-coaching', 'high-yield'] },
          { q: 'Sport demands: basketball.', a: '48 min (NBA) or 40 min (NCAA) with frequent stops. ~1000 directional changes per game. Energy: highly anaerobic with aerobic recovery; ATP-PC dominant for sprints/jumps, glycolytic for extended possessions. Key qualities: vertical power (jump), first-step quickness, lateral COD, repeated sprint capacity, shoulder stability. Injury sites: ankle (most common), knee, back.', tags: ['sport-demands', 'basketball', 'elite-coaching'] },
          { q: 'Sport demands: wrestling.', a: '3 × 2-minute periods (collegiate). High-intensity from first whistle. Highly anaerobic — glycolytic + phosphagen. Upper body pulling and pushing strength dominant. Isometric grip/neck strength critical. Injury sites: shoulder, knee, neck. Training priorities: relative strength (strength:weight ratio), aerobic base for recovery between periods, grip/neck/shoulder prehab, explosive hip power.', tags: ['sport-demands', 'wrestling', 'elite-coaching'] },
        ]
      },
      {
        id: 'coaching-skills',
        title: 'Elite Coaching Communication & Culture',
        cards: [
          { q: 'Why do external cues outperform internal cues for motor learning?', a: 'Gabriele Wulf\'s Constrained Action Hypothesis: external focus (attention to the effect of movement on the environment) allows automatic movement control. Internal focus (attention to body segments) disrupts automatic processes and degrades performance. Practical: "push the floor away" > "squeeze your glutes." "Throw your chest to the wall" > "keep your chest up." Build a repertoire of external cues for every major lift.', tags: ['coaching', 'cues', 'motor-learning', 'elite-coaching', 'high-yield'] },
          { q: 'What does research on elite S&C coach behavior show?', a: 'Studies on elite strength coaches found they spend most session time in: silent observation/monitoring, organizational activity, and verbal effort intensification ("let\'s go," "good"). NOT in constant technical instruction. Implication: over-coaching is a real problem — athletes need to practice movement without constant interruption. Correct the MOST CRITICAL error only, not every error simultaneously. Allow automatic processing to develop.', tags: ['coaching', 'communication', 'elite-coaching', 'high-yield'] },
          { q: 'What is a mastery vs. performance motivational climate?', a: 'Mastery climate: athletes are rewarded for effort, improvement, and learning. Mistakes are learning opportunities. Fosters intrinsic motivation and long-term engagement. Performance climate: success defined by comparison to others, winning, and fixed talent. Higher dropout, burnout, and performance anxiety in research. Elite S&C coaches engineer mastery climates — challenge athletes relative to their own baseline, celebrate effort and process over outcome.', tags: ['coaching', 'psychology', 'motivation', 'elite-coaching', 'high-yield'] },
          { q: 'How does an S&C coach build trust with athletes?', a: 'Four pillars: (1) Competence — know your stuff; athletes lose trust when they know more than you do; (2) Consistency — same standards every day; (3) Care — know athletes as people, not just "sport assets"; (4) Communication — be direct, honest, and proactive about program rationale. Trust is built through thousands of small consistent actions, not speeches. Relationship quality is the #1 predictor of athlete training adherence.', tags: ['coaching', 'relationships', 'elite-coaching', 'high-yield'] },
          { q: 'What are the key relationships an elite S&C coach must maintain?', a: '(1) Athletes — primary relationship; everything else serves this. (2) Head sport coach — the S&C coach serves the sport program, not vice versa; communicate athlete readiness transparently; defer on competitive decisions. (3) Athletic trainers/sports medicine — daily communication on athlete health; never override ATC/physician guidance; coordinate return-to-play collaboratively. (4) Nutrition staff, sports psychologists — integrated performance model. Elite programs have all four working in daily communication.', tags: ['coaching', 'relationships', 'professional', 'elite-coaching', 'high-yield'] },
          { q: 'What does it mean to have a coaching philosophy?', a: 'A clear, articulated set of principles that guides every decision: What do you believe about adaptation? How do you prioritize qualities? What is non-negotiable in your weight room culture? How do you handle conflict? Why do you use the periodization model you use? Elite coaches can answer all of these clearly. Interviewers at D-I and pro programs probe this directly — a vague or borrowed philosophy signals a junior coach. Build yours through mentorship, experience, and reflection on WHY you do everything.', tags: ['coaching', 'philosophy', 'professional', 'elite-coaching', 'high-yield'] },
        ]
      },
      {
        id: 'career-roadmap',
        title: 'Career Roadmap Beyond the CSCS',
        cards: [
          { q: 'What certifications matter most beyond the CSCS?', a: 'SCCC (CSCCa): requires 640 supervised hours under a SCCC coach at an accredited institution — preferred or required at many NCAA D-I programs. USAW Level 1/2: essential for coaching Olympic lifts in a competition context. FMS Level 1/2: movement screening and corrective exercise credibility. NSCA-CPSS: cutting-edge credential for sport science + S&C hybrid roles. USATF Level 1: speed development credibility. Master\'s degree: single biggest long-term differentiator — increasingly required at D-I and pro levels.', tags: ['career', 'certifications', 'elite-coaching', 'high-yield'] },
          { q: 'What is the SCCC and why does it matter for D-I jobs?', a: 'Strength and Conditioning Coach Certified (CSCCa). Requires: CSCS credential + 640 supervised internship hours at a CSCCa-accredited institution under an active SCCC. Preferred or explicitly required by many NCAA Division I programs. The CSCCa is the professional organization specifically for NCAA-context S&C; the NSCA is broader. If you want to work at the D-I level, the SCCC is the target credential alongside CSCS.', tags: ['career', 'certifications', 'elite-coaching', 'high-yield'] },
          { q: 'How important are internships for an S&C coaching career?', a: 'More important than any certification at the entry level. The S&C world is deeply relationship-driven — most jobs at D-I and pro levels are filled through networks, not public postings. A quality internship under a respected coach: (1) develops real coaching skills, (2) builds your network, (3) leads to paid assistant roles. Prioritize: D-I programs, professional teams, or elite private facilities. Quality of mentor matters more than program prestige.', tags: ['career', 'internship', 'elite-coaching', 'high-yield'] },
          { q: 'What does a high-level S&C career path typically look like?', a: 'Entry: volunteer/unpaid intern at D-I or elite facility (1-2 years). GA (graduate assistant): paid 10-20 hrs/week at D-I while pursuing master\'s degree (1-2 years). Assistant S&C coach: first paid full-time role, usually multi-sport responsibility. Associate/Co-Head: narrowed sport focus, more autonomy. Head S&C: full program oversight. Timelines: 5-10 years to D-I head coaching role is typical. Parallel path: high-level private sector (NBA/NFL performance) or collegiate sports science.', tags: ['career', 'path', 'elite-coaching', 'high-yield'] },
          { q: 'What role does film study play in becoming an elite S&C coach?', a: 'Elite S&C coaches understand the sport deeply enough to speak the sport coach\'s language. Film study lets you: identify the specific physical demands of positions, see how biomechanical breakdowns contribute to inefficiency and injury, understand what "winning positions" require physically, and present training rationale tied to game film. An S&C coach who can say "here\'s why your tight ends are losing leverage at the second level — and here\'s what we\'re doing about it in the weight room" earns trust that no certification provides.', tags: ['career', 'sport-knowledge', 'elite-coaching'] },
          { q: 'What is data literacy and why does it matter for elite coaches?', a: 'The ability to collect, interpret, and COMMUNICATE performance data to athletes, sport coaches, and administrators. Skills: reading force plate outputs, interpreting GPS load reports, understanding statistical trends vs. noise, creating clear visual summaries. The data is only as useful as your ability to communicate it — a coach who generates 50-column spreadsheets that no one reads is wasting everyone\'s time. Develop skills in Excel, basic stats, and athlete management software (TeamBuildr, Bridge Athletic, Athlete Dashboard).', tags: ['career', 'data', 'technology', 'elite-coaching', 'high-yield'] },
        ]
      },
    ]
  },
};

// ============================================================
// FORMULAS — quick-reference data
// ============================================================

const FORMULAS = [
  { name: 'Cardiac Output', formula: 'Q = HR × SV', units: 'L/min = bpm × L/beat', use: 'Volume of blood pumped per minute.' },
  { name: 'Fick Equation', formula: 'VO₂ = Q × (a-vO₂ diff)', units: 'mL O₂/min', use: 'Oxygen consumption = cardiac output × O₂ extracted by tissues.' },
  { name: 'Torque', formula: 'τ = F × d', units: 'N·m = N × m', use: 'Rotational force at a joint. d = perpendicular distance to axis (moment arm).' },
  { name: 'Work', formula: 'W = F × d', units: 'J = N × m', use: 'Energy transferred when a force moves an object.' },
  { name: 'Power', formula: 'P = W/t = F × v', units: 'W = J/s', use: 'Rate of doing work. Foundational for athletic performance.' },
  { name: 'Impulse', formula: 'J = F × Δt', units: 'N·s', use: 'Change in momentum. Both magnitude AND duration of force matter in sport.' },
  { name: 'Momentum', formula: 'p = m × v', units: 'kg·m/s', use: 'Mass × velocity. Conserved in collisions. Sport relevance: contact, throwing.' },
  { name: 'Newton\'s 2nd', formula: 'F = m × a', units: 'N = kg × m/s²', use: 'Force equals mass times acceleration.' },
  { name: 'Epley 1RM', formula: '1RM = w × (1 + r/30)', units: 'kg or lb', use: 'Estimate 1RM from reps performed at submax load.' },
  { name: 'Brzycki 1RM', formula: '1RM = w × 36/(37 - r)', units: 'kg or lb', use: 'Alternative 1RM estimator. More accurate at lower reps (<10).' },
  { name: 'Sayers Power', formula: 'P = 60.7 × JH + 45.3 × BM - 2055', units: 'Watts (JH in cm, BM in kg)', use: 'Peak lower-body power from vertical jump height.' },
  { name: 'BMI', formula: 'BMI = mass / height²', units: 'kg/m²', use: 'Crude body composition estimate. Limitations in muscular populations.' },
  { name: 'Mech. Advantage', formula: 'MA = MA_force / MA_resistance', units: 'ratio', use: 'Ratio of moment arms. >1 = muscle force less than resistance.' },
];

// ============================================================
// EXAM TIP CARDS — meta-knowledge about the CSCS itself
// ============================================================

const EXAM_TIPS = [
  { title: 'Exam Structure', body: 'Two sections, separate registrations. Scientific Foundations (1.5 hrs, 80 scored + 15 unscored multiple-choice). Practical/Applied (2.5 hrs, 110 scored + 15 unscored items, includes video/image questions). Pass scaled score: 70+. Must pass both sections.' },
  { title: 'Section Weights — Scientific Foundations', body: 'Exercise Science: ~55%. Sport Psychology: ~24%. Nutrition: ~21%. Prioritize Exercise Science (physiology, biomechanics, adaptations) — over half the questions.' },
  { title: 'Section Weights — Practical/Applied', body: 'Exercise Technique: ~36%. Program Design: ~35%. Testing & Evaluation: ~18%. Organization & Administration: ~11%. Technique + Program Design = 71% — drill these.' },
  { title: 'Pass Rates (2024)', body: 'Scientific Foundations: 68%. Practical/Applied: 44%. Both sections: 41%. The Practical/Applied is harder — don\'t underestimate the video questions on technique and exercise application.' },
  { title: 'Primary Reference', body: 'NSCA\'s Essentials of Strength Training and Conditioning (currently 5th ed.) is THE source. The Exercise Technique Manual (4th ed.) is essential for the Practical/Applied. Don\'t rely on summary guides alone.' },
  { title: 'Study Strategy', body: 'Read each chapter, take notes, do chapter quizzes, then take a full-length practice test as a baseline. Identify weaknesses, drill those, retest. NSCA offers official practice tests — these are the closest to the real exam format.' },
  { title: 'Time Management', body: 'Scientific Foundations: 95 questions / 90 min = ~57 sec/question. Practical/Applied: 125 items / 150 min = ~72 sec/item. Video items take longer. Mark and skip difficult ones; return at the end.' },
  { title: 'Common Mistake', body: 'Memorizing exact rep ranges and loading percentages from NSCA tables. The exam questions are often application — given an athlete profile, what would you prescribe? Know the principles deeply, not just the numbers.' },
  { title: 'Exercise Technique', body: 'For the Practical/Applied section, you must recognize correct vs incorrect technique in video and images. Study the Exercise Technique Manual carefully — common cues, common errors, and what a coach should correct in each lift.' },
  { title: 'Eligibility', body: 'Must hold a bachelor\'s degree (or be in final year) and current CPR/AED certification. The NSCA does not require a specific major — any degree qualifies.' },
];

// ============================================================
// HELPERS
// ============================================================

const ICONS = { Activity, Zap, Brain, Dumbbell, BarChart3, Sparkles, Target };

const getAllCards = () => {
  const cards = [];
  Object.values(CURRICULUM).forEach(phase => {
    phase.domains.forEach(domain => {
      domain.cards.forEach((card, idx) => {
        cards.push({ ...card, phaseId: phase.id, domainId: domain.id, phaseTitle: phase.title, domainTitle: domain.title, color: phase.color, cardId: `${phase.id}-${domain.id}-${idx}` });
      });
    });
  });
  return cards;
};

const STORAGE_KEY = 'cscs-study-v2';

// ============================================================
// MAIN APP
// ============================================================

const ANTHROPIC_KEY_STORAGE = 'cscs-anthropic-key';

export default function App() {
  const [view, setView] = useState('home');
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [quizConfig, setQuizConfig] = useState(null);
  const [progress, setProgress] = useState({ known: {}, struggled: {}, seen: {}, bookmarked: {}, streak: 0, lastStudy: null, totalReviews: 0, quizHistory: [] });
  const [apiKey, setApiKeyState] = useState('');

  useEffect(() => {
    storage.get(STORAGE_KEY).then(result => {
      if (result?.value) setProgress(JSON.parse(result.value));
    }).catch(() => {});
  }, []);

  useEffect(() => {
    storage.set(STORAGE_KEY, JSON.stringify(progress)).catch(() => {});
  }, [progress]);

  useEffect(() => {
    storage.get(ANTHROPIC_KEY_STORAGE).then(result => {
      if (result?.value) setApiKeyState(result.value);
    }).catch(() => {});
  }, []);

  const saveApiKey = (key) => {
    const trimmed = key.trim();
    setApiKeyState(trimmed);
    storage.set(ANTHROPIC_KEY_STORAGE, trimmed).catch(() => {});
  };

  const allCards = useMemo(() => getAllCards(), []);

  const updateProgress = (cardId, status) => {
    setProgress(p => {
      const next = { ...p, seen: { ...p.seen, [cardId]: true }, totalReviews: p.totalReviews + 1, lastStudy: new Date().toISOString() };
      if (status === 'known') next.known = { ...p.known, [cardId]: (p.known[cardId] || 0) + 1 };
      else if (status === 'struggled') next.struggled = { ...p.struggled, [cardId]: (p.struggled[cardId] || 0) + 1 };
      return next;
    });
  };

  const toggleBookmark = (cardId) => {
    setProgress(p => {
      const next = { ...p, bookmarked: { ...p.bookmarked } };
      if (next.bookmarked[cardId]) delete next.bookmarked[cardId];
      else next.bookmarked[cardId] = true;
      return next;
    });
  };

  const logQuizResult = (result) => {
    setProgress(p => ({ ...p, quizHistory: [...(p.quizHistory || []), { ...result, date: new Date().toISOString() }].slice(-50) }));
  };

  const resetProgress = () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      setProgress({ known: {}, struggled: {}, seen: {}, bookmarked: {}, streak: 0, lastStudy: null, totalReviews: 0, quizHistory: [] });
    }
  };

  return (
    <div className="min-h-screen text-stone-100" style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      background: 'radial-gradient(ellipse at top, #1a1f2e 0%, #0a0d14 50%, #050608 100%)',
      minHeight: '100dvh'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { -webkit-tap-highlight-color: transparent; }
        html, body { overscroll-behavior: none; height: 100%; }
        .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .card-flip { transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); }
        .card-flip.flipped { transform: rotateY(180deg); }
        .card-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .card-back { transform: rotateY(180deg); }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        .safe-top { padding-top: calc(env(safe-area-inset-top, 0px) + 1.5rem); }
        .safe-bottom { padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 1.5rem); }
        .btn-back { display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 10px 16px 10px 0; color: #a8a29e; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; transition: color 0.15s; }
        .btn-back:active { color: #f5f5f4; }
        .btn-icon { display: flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; color: #78716c; transition: color 0.15s; }
        .btn-icon:active { color: #f5f5f4; }
        button:active { opacity: 0.8; }
      `}</style>

      {view === 'home' && <Home setView={setView} setSelectedPhase={setSelectedPhase} progress={progress} allCards={allCards} resetProgress={resetProgress} setQuizConfig={setQuizConfig} apiKey={apiKey} saveApiKey={saveApiKey} />}
      {view === 'phase' && selectedPhase && <PhaseView phase={selectedPhase} setView={setView} setSelectedDomain={setSelectedDomain} progress={progress} />}
      {view === 'study' && selectedDomain && <StudyMode domain={selectedDomain} phase={selectedPhase} setView={setView} updateProgress={updateProgress} progress={progress} toggleBookmark={toggleBookmark} apiKey={apiKey} />}
      {view === 'quiz' && quizConfig && <QuizMode allCards={allCards} setView={setView} updateProgress={updateProgress} config={quizConfig} logQuizResult={logQuizResult} />}
      {view === 'browse' && <BrowseMode allCards={allCards} setView={setView} progress={progress} toggleBookmark={toggleBookmark} />}
      {view === 'stats' && <StatsView progress={progress} allCards={allCards} setView={setView} resetProgress={resetProgress} />}
      {view === 'formulas' && <FormulasView setView={setView} />}
      {view === 'examtips' && <ExamTipsView setView={setView} />}
    </div>
  );
}

// ============================================================
// HOME
// ============================================================

function Home({ setView, setSelectedPhase, progress, allCards, resetProgress, setQuizConfig, apiKey, saveApiKey }) {
  const totalCards = allCards.length;
  const seenCount = Object.keys(progress.seen).length;
  const knownCount = Object.keys(progress.known).length;
  const bookmarkedCount = Object.keys(progress.bookmarked || {}).length;
  const pct = totalCards > 0 ? Math.round((knownCount / totalCards) * 100) : 0;
  const [showApiInput, setShowApiInput] = useState(false);
  const [keyDraft, setKeyDraft] = useState(apiKey);

  return (
    <div className="min-h-screen px-6 max-w-6xl mx-auto relative safe-top safe-bottom">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3 text-xs font-mono text-stone-400 uppercase tracking-widest">
          <div className="w-8 h-px bg-stone-600" />
          <span>Strength & Conditioning · College-Level Reference</span>
        </div>
        <h1 className="font-display text-7xl md:text-9xl leading-none text-stone-50">
          THE <span style={{ color: '#E63946' }}>CSCS</span>
          <br/>
          PROTOCOL
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        <StatCard label="Total Cards" value={totalCards} icon={BookOpen} />
        <StatCard label="Cards Seen" value={seenCount} icon={Target} accent />
        <StatCard label="Mastered" value={knownCount} icon={Trophy} accent />
        <StatCard label="Total Reviews" value={progress.totalReviews || 0} icon={Flame} />
      </div>

      <div className="mb-12 bg-stone-900/50 backdrop-blur border border-stone-800 rounded p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-stone-400">Overall Mastery</span>
          <span className="font-display text-2xl text-stone-50">{pct}%</span>
        </div>
        <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
          <div className="h-full transition-all duration-700" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #E63946 0%, #F77F00 50%, #FCBF49 100%)' }} />
        </div>
      </div>

      {/* Quick Actions — 6 cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
        <button onClick={() => { setQuizConfig({ mode: 'random', size: 15 }); setView('quiz'); }} className="group bg-stone-50 text-stone-900 hover:bg-white transition-all p-5 rounded text-left flex items-center justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-1">Mixed Practice</div>
            <div className="font-display text-2xl">RANDOM QUIZ</div>
          </div>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button onClick={() => { setQuizConfig({ mode: 'high-yield', size: 20 }); setView('quiz'); }} className="group p-5 rounded text-left flex items-center justify-between transition-all" style={{ background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)' }}>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest opacity-70 mb-1 text-white">Exam Critical</div>
            <div className="font-display text-2xl text-white">HIGH YIELD</div>
          </div>
          <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
        </button>

        <button onClick={() => { setQuizConfig({ mode: 'struggled', size: 15 }); setView('quiz'); }} className="group bg-stone-900 border border-stone-800 hover:border-orange-500/60 transition-all p-5 rounded text-left flex items-center justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-1">Drill Weaknesses</div>
            <div className="font-display text-2xl text-stone-50">REVIEW MODE</div>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-500 group-hover:translate-x-1 transition-transform" />
        </button>

        <button onClick={() => setView('browse')} className="group bg-stone-900 border border-stone-800 hover:border-stone-600 transition-all p-5 rounded text-left flex items-center justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-1">Search Library</div>
            <div className="font-display text-2xl text-stone-50">BROWSE ALL</div>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-500 group-hover:translate-x-1 transition-transform" />
        </button>

        <button onClick={() => setView('formulas')} className="group bg-stone-900 border border-stone-800 hover:border-stone-600 transition-all p-5 rounded text-left flex items-center justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-1">Quick Reference</div>
            <div className="font-display text-2xl text-stone-50">FORMULAS</div>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-500 group-hover:translate-x-1 transition-transform" />
        </button>

        <button onClick={() => setView('examtips')} className="group bg-stone-900 border border-stone-800 hover:border-stone-600 transition-all p-5 rounded text-left flex items-center justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-1">Exam Strategy</div>
            <div className="font-display text-2xl text-stone-50">EXAM INTEL</div>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-500 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs font-mono text-stone-400 uppercase tracking-widest">
          <div className="w-8 h-px bg-stone-600" />
          <span>Study Phases</span>
        </div>
        <button onClick={() => setView('stats')} className="font-mono text-xs uppercase tracking-wide text-stone-400 hover:text-stone-100 transition-colors flex items-center gap-1">
          <BarChart3 className="w-3.5 h-3.5" /> Progress
        </button>
      </div>

      <div className="space-y-3 mb-12">
        {Object.values(CURRICULUM).map((phase, idx) => {
          const Icon = ICONS[phase.icon];
          const phaseCards = allCards.filter(c => c.phaseId === phase.id);
          const phaseKnown = phaseCards.filter(c => progress.known[c.cardId]).length;
          const phasePct = phaseCards.length > 0 ? Math.round((phaseKnown / phaseCards.length) * 100) : 0;
          return (
            <button
              key={phase.id}
              onClick={() => { setSelectedPhase(phase); setView('phase'); }}
              className="w-full group bg-stone-900/50 backdrop-blur border border-stone-800 hover:border-stone-600 transition-all rounded overflow-hidden text-left"
            >
              <div className="p-5 flex items-center gap-5">
                <div className="w-14 h-14 rounded flex items-center justify-center flex-shrink-0" style={{ background: phase.color + '22', border: `1px solid ${phase.color}44` }}>
                  <Icon className="w-6 h-6" style={{ color: phase.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-mono text-xs text-stone-500">PHASE {String(idx + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-xs text-stone-600">{phaseCards.length} cards</span>
                  </div>
                  <div className="font-display text-2xl text-stone-50 mb-1">{phase.title.split('—')[1]?.trim().toUpperCase() || phase.title.toUpperCase()}</div>
                  <div className="text-sm text-stone-400">{phase.subtitle}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-display text-3xl" style={{ color: phase.color }}>{phasePct}<span className="text-base opacity-60">%</span></div>
                  <div className="font-mono text-xs text-stone-500 uppercase">mastered</div>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-600 group-hover:translate-x-1 group-hover:text-stone-300 transition-all" />
              </div>
              <div className="h-1 bg-stone-800">
                <div className="h-full transition-all duration-700" style={{ width: `${phasePct}%`, background: phase.color }} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-12 pt-6 border-t border-stone-800">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-mono text-stone-600">SOURCES: NSCA · NASM · ACSM · NEUMANN · POWERS &amp; HOWLEY</p>
          <button onClick={() => { setKeyDraft(apiKey); setShowApiInput(v => !v); }} className="btn-icon text-stone-600">
            <Settings className="w-4 h-4" />
          </button>
        </div>
        {showApiInput && (
          <div className="bg-stone-900 border border-stone-700 rounded p-4 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-stone-400">Claude API Key</div>
            <p className="text-stone-500 text-xs leading-relaxed">Enter your Anthropic API key to enable the "Learn More" feature on flashcards. Your key is stored locally on your device.</p>
            <input
              type="password"
              value={keyDraft}
              onChange={e => setKeyDraft(e.target.value)}
              placeholder="sk-ant-..."
              className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-3 text-stone-100 text-sm font-mono focus:outline-none focus:border-stone-500"
            />
            <div className="flex gap-2">
              <button onClick={() => { saveApiKey(keyDraft); setShowApiInput(false); }} className="flex-1 bg-stone-50 text-stone-900 py-3 rounded font-mono text-xs uppercase tracking-wide min-h-[44px]">Save</button>
              <button onClick={() => setShowApiInput(false)} className="flex-1 bg-stone-800 text-stone-300 py-3 rounded font-mono text-xs uppercase tracking-wide min-h-[44px]">Cancel</button>
            </div>
            {apiKey && <p className="text-xs font-mono text-stone-500">✓ Key saved ({apiKey.slice(0, 10)}...)</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className={`p-4 rounded border ${accent ? 'bg-stone-50 text-stone-900 border-stone-50' : 'bg-stone-900/50 backdrop-blur border-stone-800 text-stone-100'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">{label}</span>
        <Icon className="w-3.5 h-3.5 opacity-50" />
      </div>
      <div className="font-display text-3xl">{value}</div>
    </div>
  );
}

// ============================================================
// PHASE VIEW
// ============================================================

function PhaseView({ phase, setView, setSelectedDomain, progress }) {
  const Icon = ICONS[phase.icon];

  return (
    <div className="min-h-screen px-6 max-w-5xl mx-auto safe-top safe-bottom">
      <button onClick={() => setView('home')} className="btn-back mb-4">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Icon className="w-5 h-5" style={{ color: phase.color }} />
          <span className="font-mono text-xs uppercase tracking-widest text-stone-400">{phase.title.split('—')[0]?.trim()}</span>
        </div>
        <h2 className="font-display text-6xl md:text-7xl leading-none mb-3" style={{ color: phase.color }}>
          {phase.title.split('—')[1]?.trim().toUpperCase()}
        </h2>
        <p className="text-stone-400 text-base">{phase.subtitle}</p>
        <p className="text-stone-500 text-sm mt-2 max-w-xl">{phase.description}</p>
      </div>

      <div className="flex items-center gap-3 mb-5 text-xs font-mono text-stone-400 uppercase tracking-widest">
        <div className="w-8 h-px bg-stone-600" />
        <span>Topics</span>
      </div>

      <div className="space-y-3">
        {phase.domains.map((domain, idx) => {
          const known = domain.cards.filter((_, i) => progress.known[`${phase.id}-${domain.id}-${i}`]).length;
          const pct = Math.round((known / domain.cards.length) * 100);
          return (
            <button
              key={domain.id}
              onClick={() => { setSelectedDomain({ ...domain, phaseId: phase.id, phaseColor: phase.color }); setView('study'); }}
              className="w-full bg-stone-900/50 backdrop-blur border border-stone-800 hover:border-stone-600 transition-all rounded p-5 text-left group flex items-center gap-4"
            >
              <div className="font-display text-3xl text-stone-700 group-hover:text-stone-500 transition-colors w-10">{String(idx + 1).padStart(2, '0')}</div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-xl text-stone-50 mb-1">{domain.title.toUpperCase()}</div>
                <div className="font-mono text-xs text-stone-500">{domain.cards.length} cards · {known}/{domain.cards.length} mastered</div>
              </div>
              <div className="w-24">
                <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full transition-all duration-700" style={{ width: `${pct}%`, background: phase.color }} />
                </div>
                <div className="font-mono text-xs text-stone-500 text-right mt-1">{pct}%</div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-600 group-hover:translate-x-1 group-hover:text-stone-300 transition-all" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// STUDY MODE
// ============================================================

function StudyMode({ domain, phase, setView, updateProgress, progress, toggleBookmark, apiKey }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [order, setOrder] = useState(domain.cards.map((_, i) => i));
  const [explanation, setExplanation] = useState('');
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [sessionStats, setSessionStats] = useState({ known: 0, struggled: 0 });

  const currentCardIdx = order[idx];
  const card = domain.cards[currentCardIdx];
  const cardId = `${domain.phaseId}-${domain.id}-${currentCardIdx}`;
  const isBookmarked = progress.bookmarked?.[cardId];
  const isLast = idx === order.length - 1;

  const handleNext = () => {
    if (isLast) return;
    setIdx(idx + 1);
    setFlipped(false);
    setExplanation('');
  };
  const handlePrev = () => {
    if (idx === 0) return;
    setIdx(idx - 1);
    setFlipped(false);
    setExplanation('');
  };

  const explainCard = async () => {
    if (!apiKey) {
      setExplanation('Add your Claude API key via the gear icon on the home screen to use Learn More.');
      return;
    }
    setLoadingExplain(true);
    setExplanation('');
    try {
      const response = await CapacitorHttp.request({
        method: 'POST',
        url: 'https://api.anthropic.com/v1/messages',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        data: {
          model: 'claude-haiku-4-5',
          max_tokens: 600,
          messages: [{
            role: 'user',
            content: `You are helping a kinesiology/CSCS student understand a flashcard concept more deeply. Be practical and specific.\n\nQuestion: ${card.q}\nStandard Answer: ${card.a}\n\nProvide THREE things in this exact format:\n**WHY IT WORKS:** [1-2 sentences on the underlying mechanism]\n**COACHING APPLICATION:** [1 concrete real-world coaching example]\n**KEY NUANCE:** [one common misconception or subtlety to know]\n\nBe direct and concise. Maximum 180 words total.`
          }]
        }
      });
      const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      setExplanation(data?.content?.[0]?.text || 'No explanation returned.');
    } catch {
      setExplanation('Request failed. Check your API key in Home → Settings (gear icon).');
    } finally {
      setLoadingExplain(false);
    }
  };
  const handleKnown = () => {
    updateProgress(cardId, 'known');
    setSessionStats(s => ({ ...s, known: s.known + 1 }));
    if (!isLast) handleNext();
  };
  const handleStruggled = () => {
    updateProgress(cardId, 'struggled');
    setSessionStats(s => ({ ...s, struggled: s.struggled + 1 }));
    if (!isLast) handleNext();
  };
  const shuffle = () => {
    setOrder([...order].sort(() => Math.random() - 0.5));
    setIdx(0);
    setFlipped(false);
    setShuffled(true);
  };

  return (
    <div className="min-h-screen px-6 max-w-3xl mx-auto flex flex-col safe-top safe-bottom">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setView('phase')} className="btn-back">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div className="flex items-center gap-1">
          <button onClick={() => toggleBookmark(cardId)} className="btn-icon">
            <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
          <button onClick={shuffle} className={`btn-icon gap-2 px-3 font-mono text-xs uppercase tracking-wide ${shuffled ? 'text-stone-100' : ''}`}>
            <Shuffle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-1">{domain.title}</div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl text-stone-50">Card {idx + 1} of {order.length}</h3>
          <div className="font-mono text-xs text-stone-500">
            <span style={{ color: '#06A77D' }}>✓ {sessionStats.known}</span>
            <span className="mx-2 text-stone-700">·</span>
            <span style={{ color: '#F77F00' }}>↻ {sessionStats.struggled}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 mb-8 flex-wrap">
        {order.map((cIdx, i) => {
          const cid = `${domain.phaseId}-${domain.id}-${cIdx}`;
          const isKnown = progress.known[cid];
          const isStruggled = progress.struggled[cid];
          const isCurrent = i === idx;
          return (
            <div
              key={i}
              className={`h-1.5 flex-1 min-w-[8px] rounded-full transition-all ${isCurrent ? 'ring-2 ring-stone-50 ring-offset-2 ring-offset-stone-950' : ''}`}
              style={{
                background: isKnown ? '#06A77D' : isStruggled ? '#F77F00' : '#3f3f3f',
              }}
            />
          );
        })}
      </div>

      <div className="flex-1 flex items-center mb-8" style={{ perspective: '1500px', minHeight: '320px' }}>
        <div onClick={() => setFlipped(!flipped)} className={`card-flip relative w-full cursor-pointer ${flipped ? 'flipped' : ''}`} style={{ minHeight: '320px' }}>
          <div className="card-face absolute inset-0 bg-stone-900 border-2 rounded-lg p-8 flex flex-col" style={{ borderColor: domain.phaseColor + '44' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="font-mono text-xs uppercase tracking-widest" style={{ color: domain.phaseColor }}>Question</div>
              <div className="font-mono text-xs text-stone-500">TAP TO REVEAL</div>
            </div>
            <div className="flex-1 flex items-center">
              <p className="font-display text-2xl md:text-3xl text-stone-50 leading-tight">{card.q}</p>
            </div>
            {card.tags && (
              <div className="flex gap-2 mt-6 flex-wrap">
                {card.tags.map(t => (
                  <span key={t} className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded" style={{ background: domain.phaseColor + '22', color: domain.phaseColor }}>{t}</span>
                ))}
              </div>
            )}
          </div>
          <div className="card-back card-face absolute inset-0 bg-stone-50 text-stone-900 rounded-lg p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="font-mono text-xs uppercase tracking-widest text-stone-500">Answer</div>
              <div className="font-mono text-xs text-stone-400">TAP TO FLIP BACK</div>
            </div>
            <div className="flex-1 flex items-center overflow-y-auto scrollbar-thin">
              <p className="text-base md:text-lg leading-relaxed">{card.a}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {flipped && (
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleStruggled} className="bg-stone-900 border border-stone-800 hover:border-orange-500/60 transition-all py-5 rounded flex items-center justify-center gap-2 text-stone-200 min-h-[56px]">
              <RotateCcw className="w-4 h-4" /> <span className="font-mono uppercase tracking-wide text-sm">Review Again</span>
            </button>
            <button onClick={handleKnown} className="text-stone-900 hover:opacity-90 transition-all py-5 rounded flex items-center justify-center gap-2 min-h-[56px]" style={{ background: '#06A77D' }}>
              <Check className="w-4 h-4" /> <span className="font-mono uppercase tracking-wide text-sm">Got It</span>
            </button>
          </div>
        )}
        {flipped && (
          <button
            onClick={explainCard}
            disabled={loadingExplain}
            className="w-full border border-stone-700 hover:border-stone-500 bg-stone-900/50 py-4 rounded flex items-center justify-center gap-2 text-stone-300 transition-all min-h-[52px]"
          >
            <Lightbulb className="w-4 h-4" style={{ color: '#FCBF49' }} />
            <span className="font-mono uppercase tracking-wide text-sm">
              {loadingExplain ? 'Thinking...' : 'Learn More'}
            </span>
          </button>
        )}

        {explanation ? (
          <div className="bg-stone-900 border border-stone-700 rounded p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-3 h-3 flex-shrink-0" style={{ color: '#FCBF49' }} />
              <span className="font-mono text-xs uppercase tracking-widest text-stone-400">Deeper Explanation</span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-wrap">{explanation}</p>
          </div>
        ) : null}

        <div className="flex gap-3">
          <button onClick={handlePrev} disabled={idx === 0} className="flex-1 bg-stone-900 border border-stone-800 hover:border-stone-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all py-3 rounded flex items-center justify-center gap-2">
            <ChevronLeft className="w-4 h-4" /> <span className="font-mono uppercase tracking-wide text-sm">Previous</span>
          </button>
          <button onClick={handleNext} disabled={isLast} className="flex-1 bg-stone-900 border border-stone-800 hover:border-stone-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all py-3 rounded flex items-center justify-center gap-2">
            <span className="font-mono uppercase tracking-wide text-sm">Next</span> <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// QUIZ MODE
// ============================================================

function QuizMode({ allCards, setView, updateProgress, config, logQuizResult }) {
  const pool = useMemo(() => {
    let cards = [...allCards];
    if (config.mode === 'high-yield') cards = cards.filter(c => c.tags?.includes('high-yield'));
    if (config.mode === 'struggled') cards = cards.filter(c => Object.keys(c.tags || {}).length === 0 || true).filter(c => true); // gets struggled below
    if (config.mode === 'foundational') cards = cards.filter(c => c.tags?.includes('foundational'));
    return cards.sort(() => Math.random() - 0.5).slice(0, config.size);
  }, [allCards, config]);

  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  const [finished, setFinished] = useState(false);

  if (!pool.length) {
    return (
      <div className="min-h-screen px-6 max-w-2xl mx-auto flex flex-col items-center justify-center text-center safe-top safe-bottom">
        <div className="font-display text-3xl text-stone-50 mb-3">No cards in this set</div>
        <p className="text-stone-400 mb-8">Study some cards first, then try this mode.</p>
        <button onClick={() => setView('home')} className="bg-stone-50 text-stone-900 px-8 py-4 rounded font-mono uppercase tracking-wide text-sm min-h-[52px]">Back Home</button>
      </div>
    );
  }

  const card = pool[idx];
  const isLast = idx === pool.length - 1;

  const handleAnswer = (correct) => {
    const newStats = correct ? { ...stats, correct: stats.correct + 1 } : { ...stats, incorrect: stats.incorrect + 1 };
    setStats(newStats);
    updateProgress(card.cardId, correct ? 'known' : 'struggled');
    if (isLast) {
      logQuizResult({ mode: config.mode, total: pool.length, correct: newStats.correct });
      setFinished(true);
    } else {
      setIdx(idx + 1);
      setRevealed(false);
    }
  };

  if (finished) {
    const total = stats.correct + stats.incorrect;
    const pct = Math.round((stats.correct / total) * 100);
    return (
      <div className="min-h-screen px-6 max-w-2xl mx-auto flex flex-col items-center justify-center text-center safe-top safe-bottom">
        <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-3">Quiz Complete</div>
        <div className="font-display text-8xl mb-3" style={{ color: pct >= 80 ? '#06A77D' : pct >= 60 ? '#FCBF49' : '#E63946' }}>{pct}%</div>
        <div className="font-display text-2xl text-stone-50 mb-2">{stats.correct} of {total} correct</div>
        <p className="text-stone-400 mb-10 max-w-md">
          {pct >= 85 && "Excellent. You're operating at exam level — keep this rhythm."}
          {pct >= 70 && pct < 85 && "Above the CSCS passing threshold. Solid. Keep drilling the misses."}
          {pct >= 60 && pct < 70 && "Right at the line. Identify the misses, drill them, retest tomorrow."}
          {pct < 60 && "Time to grind. Open the phases and work the fundamentals — that's exactly what study is for."}
        </p>
        <div className="flex gap-3">
          <button onClick={() => setView('home')} className="bg-stone-900 border border-stone-800 hover:border-stone-600 px-6 py-3 rounded font-mono uppercase tracking-wide text-sm">Home</button>
          <button onClick={() => { setIdx(0); setRevealed(false); setStats({correct:0,incorrect:0}); setFinished(false); }} className="bg-stone-50 text-stone-900 hover:bg-white px-6 py-3 rounded font-mono uppercase tracking-wide text-sm">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 max-w-3xl mx-auto flex flex-col safe-top safe-bottom">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => { if(confirm('Exit quiz? Progress for this session will be lost.')) setView('home'); }} className="btn-back">
          <ArrowLeft className="w-5 h-5" /> Exit
        </button>
        <div className="font-mono text-xs text-stone-500">
          <span style={{ color: '#06A77D' }}>✓ {stats.correct}</span>
          <span className="mx-2 text-stone-700">·</span>
          <span style={{ color: '#E63946' }}>✗ {stats.incorrect}</span>
        </div>
      </div>

      <div className="mb-2 font-mono text-xs uppercase tracking-widest text-stone-500">
        {config.mode === 'high-yield' ? 'High-Yield Quiz' : config.mode === 'struggled' ? 'Review Quiz' : config.mode === 'foundational' ? 'Foundations Quiz' : 'Random Quiz'} · {card.phaseTitle.split('—')[0]?.trim()}
      </div>
      <h3 className="font-display text-3xl text-stone-50 mb-1">{card.domainTitle}</h3>
      <div className="font-mono text-xs text-stone-500 mb-6">Question {idx + 1} of {pool.length}</div>

      <div className="flex gap-1 mb-8">
        {pool.map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full" style={{ background: i < idx ? '#06A77D' : i === idx ? card.color : '#3f3f3f' }} />
        ))}
      </div>

      <div className="bg-stone-900 border-2 rounded-lg p-8 mb-6 flex-1" style={{ borderColor: card.color + '44' }}>
        <div className="font-mono text-xs uppercase tracking-widest mb-6" style={{ color: card.color }}>Question</div>
        <p className="font-display text-2xl md:text-3xl text-stone-50 leading-tight mb-8">{card.q}</p>

        {revealed && (
          <div className="border-t border-stone-800 pt-6 mt-6">
            <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-3">Answer</div>
            <p className="text-stone-200 text-base md:text-lg leading-relaxed">{card.a}</p>
          </div>
        )}
      </div>

      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="w-full bg-stone-50 text-stone-900 hover:bg-white py-4 rounded font-mono uppercase tracking-wide text-sm">Reveal Answer</button>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => handleAnswer(false)} className="border border-stone-800 hover:border-red-500/60 bg-stone-900 py-4 rounded flex items-center justify-center gap-2 text-stone-200">
            <X className="w-4 h-4 text-red-500" /> <span className="font-mono uppercase tracking-wide text-sm">Got it Wrong</span>
          </button>
          <button onClick={() => handleAnswer(true)} className="text-stone-900 hover:opacity-90 py-4 rounded flex items-center justify-center gap-2" style={{ background: '#06A77D' }}>
            <Check className="w-4 h-4" /> <span className="font-mono uppercase tracking-wide text-sm">Got it Right</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// BROWSE MODE
// ============================================================

function BrowseMode({ allCards, setView, progress, toggleBookmark }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() => {
    let cards = allCards;
    if (filter === 'mastered') cards = cards.filter(c => progress.known[c.cardId]);
    if (filter === 'struggling') cards = cards.filter(c => progress.struggled[c.cardId] && !progress.known[c.cardId]);
    if (filter === 'unseen') cards = cards.filter(c => !progress.seen[c.cardId]);
    if (filter === 'high-yield') cards = cards.filter(c => c.tags?.includes('high-yield'));
    if (filter === 'foundational') cards = cards.filter(c => c.tags?.includes('foundational'));
    if (filter === 'nasm') cards = cards.filter(c => c.tags?.includes('nasm'));
    if (filter === 'psych') cards = cards.filter(c => c.tags?.includes('psych'));
    if (filter === 'nutrition') cards = cards.filter(c => c.tags?.includes('nutrition'));
    if (filter === 'bookmarked') cards = cards.filter(c => progress.bookmarked?.[c.cardId]);
    if (search.trim()) {
      const s = search.toLowerCase();
      cards = cards.filter(c => c.q.toLowerCase().includes(s) || c.a.toLowerCase().includes(s) || c.tags?.some(t => t.toLowerCase().includes(s)) || c.domainTitle.toLowerCase().includes(s));
    }
    return cards;
  }, [search, filter, allCards, progress]);

  return (
    <div className="min-h-screen px-6 max-w-4xl mx-auto safe-top safe-bottom">
      <button onClick={() => setView('home')} className="btn-back mb-2">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <h2 className="font-display text-6xl text-stone-50 mb-6">BROWSE LIBRARY</h2>

      <div className="relative mb-4">
        <Search className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by keyword, tag, topic, or concept..."
          className="w-full bg-stone-900 border border-stone-800 rounded pl-11 pr-4 py-3 text-stone-100 placeholder:text-stone-500 focus:border-stone-600 focus:outline-none font-mono text-sm"
        />
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { id: 'all', label: 'All' },
          { id: 'high-yield', label: 'High Yield' },
          { id: 'foundational', label: 'Foundational' },
          { id: 'nasm', label: 'NASM' },
          { id: 'psych', label: 'Sport Psych' },
          { id: 'nutrition', label: 'Nutrition' },
          { id: 'bookmarked', label: 'Bookmarked' },
          { id: 'mastered', label: 'Mastered' },
          { id: 'struggling', label: 'Struggling' },
          { id: 'unseen', label: 'Unseen' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider transition-all ${filter === f.id ? 'bg-stone-50 text-stone-900' : 'bg-stone-900 border border-stone-800 text-stone-400 hover:border-stone-600'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="font-mono text-xs text-stone-500 mb-4">{filtered.length} cards</div>

      <div className="space-y-2">
        {filtered.map((c) => {
          const isKnown = progress.known[c.cardId];
          const isStruggled = progress.struggled[c.cardId];
          const isBookmarked = progress.bookmarked?.[c.cardId];
          const expanded = expandedId === c.cardId;
          return (
            <div key={c.cardId} className="bg-stone-900 border border-stone-800 rounded overflow-hidden">
              <div className="w-full p-4 hover:bg-stone-900/80 transition-colors flex items-start gap-3">
                <div className="w-1 self-stretch rounded-full" style={{ background: c.color }} />
                <button onClick={() => setExpandedId(expanded ? null : c.cardId)} className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500">{c.domainTitle}</span>
                    {isKnown && <span className="font-mono text-[10px] px-1.5 py-0.5 rounded" style={{ background: '#06A77D22', color: '#06A77D' }}>MASTERED</span>}
                    {isStruggled && !isKnown && <span className="font-mono text-[10px] px-1.5 py-0.5 rounded" style={{ background: '#F77F0022', color: '#F77F00' }}>REVIEW</span>}
                    {c.tags?.includes('high-yield') && <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-stone-700 text-stone-300">HIGH YIELD</span>}
                  </div>
                  <p className="text-stone-100 text-sm">{c.q}</p>
                  {expanded && (
                    <p className="text-stone-400 text-sm mt-3 pt-3 border-t border-stone-800 leading-relaxed">{c.a}</p>
                  )}
                </button>
                <button onClick={() => toggleBookmark(c.cardId)} className="text-stone-500 hover:text-stone-100 transition-colors">
                  <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-stone-500 font-mono text-sm">No cards match these filters.</div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// STATS VIEW
// ============================================================

function StatsView({ progress, allCards, setView, resetProgress }) {
  const totalCards = allCards.length;
  const seenCount = Object.keys(progress.seen).length;
  const knownCount = Object.keys(progress.known).length;
  const strugglingCount = Object.keys(progress.struggled).filter(id => !progress.known[id]).length;
  const bookmarkedCount = Object.keys(progress.bookmarked || {}).length;

  const byPhase = Object.values(CURRICULUM).map(phase => {
    const cards = allCards.filter(c => c.phaseId === phase.id);
    const known = cards.filter(c => progress.known[c.cardId]).length;
    return { phase, total: cards.length, known, pct: Math.round((known / cards.length) * 100) };
  });

  const recentQuizzes = (progress.quizHistory || []).slice(-5).reverse();

  return (
    <div className="min-h-screen px-6 max-w-4xl mx-auto safe-top safe-bottom">
      <button onClick={() => setView('home')} className="btn-back mb-2">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h2 className="font-display text-6xl text-stone-50 mb-2">PROGRESS</h2>
      <p className="text-stone-400 mb-10">Your study metrics, updated as you go.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <StatCard label="Total Cards" value={totalCards} icon={BookOpen} />
        <StatCard label="Seen" value={seenCount} icon={Target} />
        <StatCard label="Mastered" value={knownCount} icon={Trophy} accent />
        <StatCard label="Need Review" value={strugglingCount} icon={RotateCcw} />
      </div>

      <div className="mb-10">
        <div className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4">Mastery by Phase</div>
        <div className="space-y-3">
          {byPhase.map(({ phase, total, known, pct }) => (
            <div key={phase.id} className="bg-stone-900 border border-stone-800 rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-display text-lg text-stone-50">{phase.title.split('—')[1]?.trim() || phase.title}</div>
                <div className="font-mono text-xs text-stone-500">{known}/{total}</div>
              </div>
              <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full transition-all duration-700" style={{ width: `${pct}%`, background: phase.color }} />
              </div>
              <div className="font-mono text-xs text-stone-500 text-right mt-1">{pct}%</div>
            </div>
          ))}
        </div>
      </div>

      {recentQuizzes.length > 0 && (
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4">Recent Quizzes</div>
          <div className="space-y-2">
            {recentQuizzes.map((q, i) => {
              const pct = Math.round((q.correct / q.total) * 100);
              return (
                <div key={i} className="bg-stone-900 border border-stone-800 rounded p-4 flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg text-stone-50 capitalize">{q.mode.replace('-', ' ')} Quiz</div>
                    <div className="font-mono text-xs text-stone-500">{new Date(q.date).toLocaleDateString()} · {q.correct}/{q.total}</div>
                  </div>
                  <div className="font-display text-2xl" style={{ color: pct >= 80 ? '#06A77D' : pct >= 60 ? '#FCBF49' : '#E63946' }}>{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4">Activity</div>
        <div className="bg-stone-900 border border-stone-800 rounded p-5">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-1">Total Reviews</div>
              <div className="font-display text-4xl text-stone-50">{progress.totalReviews || 0}</div>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-1">Last Studied</div>
              <div className="font-display text-lg text-stone-50">{progress.lastStudy ? new Date(progress.lastStudy).toLocaleDateString() : 'Never'}</div>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-1">Bookmarked</div>
              <div className="font-display text-3xl text-stone-50">{bookmarkedCount}</div>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-1">Quizzes Taken</div>
              <div className="font-display text-3xl text-stone-50">{(progress.quizHistory || []).length}</div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={resetProgress} className="text-stone-500 hover:text-red-400 transition-colors text-sm font-mono uppercase tracking-wide">Reset all progress</button>
    </div>
  );
}

// ============================================================
// FORMULAS VIEW
// ============================================================

function FormulasView({ setView }) {
  return (
    <div className="min-h-screen px-6 max-w-4xl mx-auto safe-top safe-bottom">
      <button onClick={() => setView('home')} className="btn-back mb-2">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h2 className="font-display text-6xl text-stone-50 mb-2">FORMULAS</h2>
      <p className="text-stone-400 mb-10">Quick-reference equations you should have memorized cold.</p>

      <div className="space-y-3">
        {FORMULAS.map((f, i) => (
          <div key={i} className="bg-stone-900 border border-stone-800 rounded p-5">
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-display text-xl text-stone-50">{f.name.toUpperCase()}</div>
              <div className="font-mono text-xs text-stone-500">{f.units}</div>
            </div>
            <div className="font-mono text-lg text-stone-100 bg-stone-950 border border-stone-800 rounded p-3 mb-3">{f.formula}</div>
            <p className="text-stone-400 text-sm leading-relaxed">{f.use}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// EXAM TIPS VIEW
// ============================================================

function ExamTipsView({ setView }) {
  return (
    <div className="min-h-screen px-6 max-w-4xl mx-auto safe-top safe-bottom">
      <button onClick={() => setView('home')} className="btn-back mb-2">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h2 className="font-display text-6xl text-stone-50 mb-2">EXAM INTEL</h2>
      <p className="text-stone-400 mb-10">What to know about the CSCS exam itself — structure, strategy, and stats.</p>

      <div className="space-y-3">
        {EXAM_TIPS.map((t, i) => (
          <div key={i} className="bg-stone-900 border border-stone-800 rounded p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: '#5E60CE22', border: '1px solid #5E60CE44' }}>
                <AlertCircle className="w-4 h-4" style={{ color: '#5E60CE' }} />
              </div>
              <div className="font-display text-xl text-stone-50">{t.title.toUpperCase()}</div>
            </div>
            <p className="text-stone-300 text-sm md:text-base leading-relaxed">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
