/* Famulus Science · the animated demo on the landing page.

   Same idiom as the Famulus Academic demo (landings2026 guide player): tabs for the scenes, a numbered step list,
   a caption with a gold edge, play/step controls; it starts when it is in view and stops when it leaves; under
   prefers-reduced-motion nothing moves by itself and the steps are still pictures turned with the buttons.
   ?fd=<scene>&s=<step> opens a scene at a step (for screenshots).

   Instead of a phone the stage is a drawn workbench window: a module rail on the left, the working pane on the right.
   Scenes marked `sample: true` use sample data written for this page. The scene `pilot` follows the published
   reconstruction (Graßhoff, Casties & Nickelsen 2001, pp. 316–318; Graßhoff 1998, pp. 85–90); every step names its
   locus. Do not put anything into that scene that the sources do not say. */
(function () {
  'use strict';
  const RM = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const P = new URLSearchParams(location.search);
  const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const L = (de, en) => `<span data-l="de">${de}</span><span data-l="en">${en || de}</span>`;
  const SRC = (de, en) => `<div class="fd-src st">${L('Quelle: ' + de, 'Source: ' + (en || de))}</div>`;
  const LT = (x, y, de, en, cls) => `<text x="${x}" y="${y}"${cls ? ` class="${cls}"` : ''} data-l="de">${de}</text><text x="${x}" y="${y}"${cls ? ` class="${cls}"` : ''} data-l="en">${en || de}</text>`;
  const PF = (() => { const n = document.getElementById('fd-pilot'); return n ? JSON.parse(n.textContent) : {}; })();
  const FL = v => L(v.de, v.en);
  // one row per fact of content/pilot.yaml: module chip, text, source (checked against PDAI by build.py)
  const FACTS = (...ids) => ids.filter(i => PF[i]).map(i => `<div class="fd-fact st"><em>${FL(PF[i].module)}</em><span>${FL(PF[i].text)}</span><small>${PF[i].cite}</small></div>`).join('');
  const SAMPLE = `<span class="fd-sample">${L('Beispieldaten', 'sample data')}</span>`;

  const I = {
    screening: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3"/><path d="M12 12l4-3"/></svg>',
    literature: '<svg viewBox="0 0 24 24"><path d="M4 5.5C6.5 4 9.5 4 12 5.5 14.5 4 17.5 4 20 5.5V19c-2.5-1.5-5.5-1.5-8 0-2.5-1.5-5.5-1.5-8 0zM12 5.5V19"/></svg>',
    structure: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="4" rx="1"/><rect x="3" y="17" width="6" height="4" rx="1"/><rect x="15" y="17" width="6" height="4" rx="1"/><path d="M12 7v5M6 17v-2.5h12V17M12 12v2.5"/></svg>',
    hypotheses: '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
    notebook: '<svg viewBox="0 0 24 24"><path d="M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6zM9 3v18M12 8h4M12 12h4"/></svg>',
    bench: '<svg viewBox="0 0 24 24"><path d="M9.5 3h5M10.5 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2L13.5 9V3M7.5 15h9"/></svg>',
    reporting: '<svg viewBox="0 0 24 24"><path d="M6 3h9l3 3v15H6zM9 9h6M9 13h6M9 17h4"/></svg>',
    person: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-4 3.6-6 7-6s6.2 2 7 6"/></svg>',
    fam: '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 4.7L18.5 9l-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.3z"/><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></svg>',
    monitor: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4M6.5 12l3-3 2.5 2 5-4.5"/></svg>',
    agenda: '<svg viewBox="0 0 24 24"><path d="M5 21V4M5 4h11l-2 3.5 2 3.5H5"/><path d="M14 17l2 2 4-4"/></svg>',
    lab: '<svg viewBox="0 0 24 24"><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 13V8h4v5M9 8V4M15 13v-3h3v3M7 16.5h2"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="12" rx="1.5"/><path d="M4 7l8 6 8-6"/></svg>',
    collab: '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="8" r="2.5"/><path d="M3.5 19c.6-3.2 2.4-5 4.5-5s3.9 1.8 4.5 5M11.5 19c.6-3.2 2.4-5 4.5-5s3.9 1.8 4.5 5"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    cross: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    open: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><path d="M12 8v5M12 16v.5"/></svg>',
    share: '<svg viewBox="0 0 24 24"><path d="M12 15V4M8 8l4-4 4 4M6 11v9h12v-9"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M9 6v12M15 6v12"/></svg>',
    prev: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
  };
  const RAIL = ['monitor', 'agenda', 'screening', 'literature', 'structure', 'hypotheses', 'notebook', 'lab', 'bench', 'reporting', 'collab'];

  // ---------- the scenes ----------
  const SCENES = [
    {
      id: 'tag', icon: 'monitor', sample: true, mod: 'monitor',
      tab: L('Ein Forschungstag', 'A research day'),
      steps: [
        { time: '18:10', mod: 'notebook', cap: L('Abends: Sie halten den Befund des Tages fest', 'Evening: you record the day\'s finding'),
          you: L('Sie diktieren das Ergebnis der Messreihe ins Laborbuch.', 'You dictate the result of the measurement series into the notebook.'),
          fam: L('Famulus legt den Eintrag strukturiert ab, verknüpft ihn mit Meilenstein M2 und bewertet Ihre Hypothesen neu.', 'Famulus files the entry in structured form, links it to milestone M2 and re-assesses your hypotheses.'),
          pane: () => `<div class="fd-nb st">${L('Harnstoff sinkt nur, wenn X und Y beide fehlen.', 'Urea falls only when X and Y are both missing.')}</div>
            <div class="fd-verdict st"><b>H1</b>${L('Enzym X nötig', 'enzyme X needed')}<i style="--v:40%"></i></div>
            <div class="fd-verdict st"><b>H2</b>${L('Ersatzweg über Y ↑', 'backup route via Y ↑')}<i style="--v:68%"></i></div>` },
        { time: '02:00', night: true, mod: 'screening', cap: L('Nachts: Famulus liest die neue Literatur der Welt gegen Ihren Befund', 'At night: Famulus reads the world\'s new literature against your finding'),
          you: L('Sie schlafen.', 'You are asleep.'),
          fam: L('Famulus prüft die neuen Arbeiten des Tages weltweit auf Zusammenhänge mit Ihrem Befund und Ihren Hypothesen.', 'Famulus checks the day\'s new papers worldwide for connections with your finding and your hypotheses.'),
          pane: () => `<div class="fd-scan st"><span>PubMed</span><i></i></div><div class="fd-scan st"><span>bioRxiv</span><i></i></div>
            <div class="fd-scan st"><span>arXiv</span><i></i></div><div class="fd-scan st"><span>Crossref</span><i></i></div>
            <div class="fd-meta st">${L('212 neue Arbeiten → 6 mit Bezug zu Ihrem Befund', '212 new papers → 6 bearing on your finding')}</div>` },
        { time: '07:30', mod: 'monitor', cap: L('Morgens: Ihr Forschungsbericht liegt bereit', 'Morning: your research report is ready'),
          you: L('Sie lesen beim Kaffee den Morgenbericht.', 'You read the morning report over coffee.'),
          fam: L('Famulus hat die Treffer eingeordnet: Bestätigung, stützende Evidenz, Widerspruch zu Ihren Befunden.', 'Famulus has sorted the hits: confirmation, supporting evidence, contradiction of your findings.'),
          pane: () => `<div class="fd-row st"><span class="fd-tag ok">${L('bestätigt', 'confirms')}</span>${L('Andere Gruppe: Doppel-Knockout senkt Harnstoff – wie bei Ihnen', 'Other group: double knock-out lowers urea – as in your data')}</div>
            <div class="fd-row st"><span class="fd-tag ok">${L('stützt', 'supports')} H2</span>${L('Isotopendaten zeigen Fluss über Y', 'Isotope data show flux via Y')}</div>
            <div class="fd-row st"><span class="fd-tag no">${L('widerspricht', 'contradicts')}</span>${L('Studie im Zellmodell: kein Effekt ohne X', 'Cell-model study: no effect without X')}</div>` },
        { time: '07:45', mod: 'structure', cap: L('Den Widerspruch prüfen – die Analyse ist schon gemacht', 'Checking the contradiction – the analysis is already done'),
          you: L('Sie öffnen die widersprechende Studie.', 'You open the contradicting study.'),
          fam: L('Famulus hat sie strukturell analysiert: Der Schluss ruht auf einer unbegründeten Prämisse, eine Kontrolle fehlt.', 'Famulus has analysed it structurally: the conclusion rests on an unjustified premise, a control is missing.'),
          pane: () => `<div class="fd-claim st"><b>C2</b>${L('„Enzym X ist entbehrlich“', '“Enzyme X is dispensable”')}<small>S. 7</small></div>
            <div class="fd-row st"><span class="fd-tag no">${L('Prämisse', 'premise')}</span>${L('„kein Ersatzweg“ – nirgends begründet', '“no backup route” – justified nowhere')}</div>
            <div class="fd-row st"><span class="fd-tag no">${L('fehlt', 'missing')}</span>${L('Kontrolle: Y zugleich ausgeschaltet', 'Control: Y knocked out as well')}</div>` },
        { time: '08:00', mod: 'agenda', cap: L('Den Forschungsplan aktualisieren – mit einem Klick', 'Updating the research plan – with one click'),
          you: L('Sie bestätigen den Vorschlag.', 'You confirm the proposal.'),
          fam: L('Famulus fügt Meilenstein M3a ein, bestellt die Methodenarbeit per Fernleihe, fragt Person B nach der Zellkultur und reserviert Gerätezeit.', 'Famulus adds milestone M3a, orders the methods paper by interlibrary loan, asks person B for the cell culture and books instrument time.'),
          pane: () => `<div class="fd-ms run st"><i></i><b>M3a</b>${L('Widerspruch klären: Doppel-Knockout mit Kontrolle', 'Settle the contradiction: double knock-out with control')}<small>${L('neu', 'new')}</small></div>
            <div class="fd-req st">${I.literature}<span>${L('Fernleihe Methodenarbeit · ca. 3 Wochen', 'Interlibrary loan, methods paper · about 3 weeks')}</span><em>${L('bestellt', 'ordered')}</em></div>
            <div class="fd-req st">${I.mail}<span>${L('Person B: Zellkultur bis 18. Nov.?', 'Person B: cell culture by 18 Nov?')}</span><em>${L('angefragt', 'asked')}</em></div>
            <div class="fd-req st">${I.lab}<span>${L('Massenspektrometer ab 22. Nov.', 'Mass spectrometer from 22 Nov')}</span><em class="ok">${L('reserviert', 'booked')}</em></div>` },
        { time: '13:20', mod: 'collab', cap: L('Mittags: Zuarbeit trifft ein und wird eingearbeitet', 'Midday: a contribution arrives and is worked in'),
          you: L('Sie arbeiten ungestört an Ihrer Analyse.', 'You work on your analysis undisturbed.'),
          fam: L('Famulus liest die Antwort von Person B, plant M3a ein und meldet: alle Voraussetzungen erfüllt.', 'Famulus reads person B\'s answer, schedules M3a and reports: all prerequisites met.'),
          pane: () => `<div class="fd-mail st">${I.mail}<span><b>${L('Person B', 'Person B')}</b>${L('„Zellkultur steht ab 16. Nov. bereit.“', '“Cell culture ready from 16 Nov.”')}</span></div>
            <div class="fd-ms run st"><i></i><b>M3a</b>${L('Start 22. Nov. · Probenvorbereitung 16.–21. Nov.', 'Start 22 Nov · sample preparation 16–21 Nov')}<small>${L('bereit', 'ready')}</small></div>` },
        { time: '17:30', mod: 'reporting', cap: L('Tagesbilanz: Ihr Tag gehörte der Forschung', 'End of day: your day belonged to research'),
          you: L('Sie haben sich auf Ihre eigentliche Forschung konzentriert.', 'You concentrated on your actual research.'),
          fam: L('Famulus hat Ihnen heute abgenommen:', 'Famulus took off your hands today:'),
          pane: () => `<div class="fd-done">
            <span class="st">${I.check}${L('Laborbuch strukturiert, Hypothesen neu bewertet', 'Notebook structured, hypotheses re-assessed')}</span>
            <span class="st">${I.check}${L('212 neue Arbeiten gegen Ihren Befund geprüft', '212 new papers checked against your finding')}</span>
            <span class="st">${I.check}${L('Widersprechende Studie analysiert', 'Contradicting study analysed')}</span>
            <span class="st">${I.check}${L('Forschungsplan aktualisiert', 'Research plan updated')}</span>
            <span class="st">${I.check}${L('Fernleihe, Anfrage, Gerätezeit organisiert', 'Loan, request, instrument time organised')}</span>
            <span class="st">${I.check}${L('Zuarbeit eingearbeitet', 'Contribution worked in')}</span></div>` },
      ],
    },
    {
      id: 'gruppe', icon: 'collab', sample: true, mod: 'collab',
      tab: L('Die Forschergruppe', 'The research group'),
      steps: [
        { time: L('Freitag 16:00', 'Friday 4 pm'), mod: 'collab', cap: L('Die Ergebnisse der Woche aus der ganzen Gruppe', 'The week\'s results from the whole group'),
          you: L('Sie wollen wissen, wo die Gruppe steht.', 'You want to know where the group stands.'),
          fam: L('Famulus hat die Einträge aller Mitglieder ausgewertet und miteinander abgeglichen.', 'Famulus has evaluated the entries of all members and compared them.'),
          pane: () => `<div class="fd-row st"><span class="fd-tag">A</span>${L('Messreihe M2 abgeschlossen: X allein ohne Effekt', 'Series M2 finished: X alone has no effect')}</div>
            <div class="fd-row st"><span class="fd-tag">B</span>${L('Zellkultur für M3a angesetzt', 'Cell culture for M3a started')}</div>
            <div class="fd-row st"><span class="fd-tag">C</span>${L('Isotopenmessung: Fluss über Y', 'Isotope measurement: flux via Y')}</div>
            <div class="fd-pred ok st">${I.check}<span>${L('A und C stützen sich gegenseitig: beide sprechen für den Ersatzweg H2', 'A and C support each other: both speak for the backup route H2')}</span></div>` },
        { time: L('Freitag 16:05', 'Friday 4:05 pm'), mod: 'agenda', cap: L('Der Gesamtarbeitsplan schreibt sich fort', 'The overall work plan updates itself'),
          you: L('Sie sehen den ganzen Plan auf einen Blick.', 'You see the whole plan at a glance.'),
          fam: L('Famulus ordnet die Ergebnisse in den Gesamtplan ein und zeigt, was voneinander abhängt.', 'Famulus slots the results into the overall plan and shows what depends on what.'),
          pane: () => `<div class="fd-plan">
            <div class="st"><b>A</b><span><i class="d" style="--x:0;--w:38%">M2</i><i style="--x:62%;--w:30%">M4</i></span></div>
            <div class="st"><b>B</b><span><i class="r" style="--x:20%;--w:30%">${L('Kultur', 'culture')}</i><i style="--x:52%;--w:26%">M3a</i></span></div>
            <div class="st"><b>C</b><span><i class="d" style="--x:0;--w:44%">${L('Isotope', 'isotopes')}</i><i style="--x:48%;--w:40%">${L('Manuskript', 'manuscript')}</i></span></div>
            <em class="st">${L('M3a wartet auf die Kultur von B · M4 wartet auf M3a', 'M3a waits for B\'s culture · M4 waits for M3a')}</em></div>` },
        { time: L('Freitag 16:10', 'Friday 4:10 pm'), mod: 'collab', cap: L('Aufgaben gehen automatisch an die Gruppe', 'Tasks go to the group automatically'),
          you: L('Sie geben die Vorschläge mit einem Klick frei.', 'You release the proposals with one click.'),
          fam: L('Famulus schreibt jedem Mitglied, was bis wann gebraucht wird, mit dem nötigen Kontext.', 'Famulus tells each member what is needed by when, with the context they need.'),
          pane: () => `<div class="fd-req st">${I.mail}<span>${L('An A: Kontrolle mit Y-Knockout vorbereiten · bis 21. Nov.', 'To A: prepare the Y knock-out control · by 21 Nov')}</span><em class="ok">${L('gesendet', 'sent')}</em></div>
            <div class="fd-req st">${I.mail}<span>${L('An B: Kultur am 16. Nov. an A übergeben', 'To B: hand the culture to A on 16 Nov')}</span><em class="ok">${L('gesendet', 'sent')}</em></div>
            <div class="fd-req st">${I.mail}<span>${L('An C: Isotopendaten in das Manuskript, Abschnitt 3', 'To C: isotope data into the manuscript, section 3')}</span><em class="ok">${L('gesendet', 'sent')}</em></div>` },
        { time: L('Montag 08:00', 'Monday 8 am'), mod: 'monitor', cap: L('Rückmeldungen, aufbereitet in Ihrem Workspace', 'Feedback, prepared in your workspace'),
          you: L('Sie öffnen Ihren Workspace.', 'You open your workspace.'),
          fam: L('Famulus hat die Antworten gesammelt, geordnet und in Plan und Hypothesen eingearbeitet.', 'Famulus has collected the answers, sorted them and worked them into plan and hypotheses.'),
          pane: () => `<div class="fd-mail st">${I.mail}<span><b>A</b>${L('Kontrolle steht – Bedenken: zu wenig Replikate', 'Control ready – concern: too few replicates')}</span></div>
            <div class="fd-mail st">${I.mail}<span><b>C</b>${L('Abschnitt 3 entworfen, zwei Abbildungen', 'Section 3 drafted, two figures')}</span></div>
            <div class="fd-row st"><span class="fd-tag no">${L('zu entscheiden', 'to decide')}</span>${L('Replikate von 3 auf 6 erhöhen? +4 Tage für M3a', 'Raise replicates from 3 to 6? +4 days for M3a')}</div>
            <div class="fd-row st"><span class="fd-tag ok">${L('eingearbeitet', 'worked in')}</span>${L('Manuskript Abschnitt 3 · Plan aktualisiert', 'Manuscript section 3 · plan updated')}</div>` },
      ],
    },
    {
      id: 'analyse', icon: 'structure', sample: true, mod: 'structure',
      tab: L('Strukturanalyse', 'Structural analysis'),
      steps: [
        { you: L('Sie geben Famulus eine Publikation, die Ihrem Befund widerspricht.', 'You give Famulus a publication that contradicts your finding.'),
          fam: L('Famulus liest sie und findet ihre Behauptungen, mit Seitenangabe.', 'Famulus reads it and finds its claims, with page references.'),
          cap: L('Famulus liest die Publikation und findet ihre Behauptungen', 'Famulus reads the publication and finds its claims'),
          pane: () => `<div class="fd-h">${I.structure}<b>${L('Behauptungen', 'Claims')}</b> ${SAMPLE}</div>
            <div class="fd-claim st"><b>C1</b>${L('Ohne Enzym X sinkt die Harnstoffbildung nicht.', 'Without enzyme X, urea formation does not fall.')}<small>S. 3</small></div>
            <div class="fd-claim st"><b>C2</b>${L('Enzym X ist für den Zyklus entbehrlich.', 'Enzyme X is dispensable for the cycle.')}<small>S. 7</small></div>` },
        { you: L('Sie wollen wissen, worauf der Schluss beruht.', 'You want to know what the conclusion rests on.'),
          fam: L('Famulus legt die Argumentation frei und markiert die unbegründete Prämisse.', 'Famulus lays out the argument and marks the unjustified premise.'),
          cap: L('Die Argumentation: welche Prämissen tragen den Schluss?', 'The argument: which premises carry the conclusion?'),
          pane: () => `<div class="fd-h">${I.structure}<b>${L('Argumentation', 'Argument')}</b> ${SAMPLE}</div>
            <svg class="fd-arg st" viewBox="0 0 300 120"><g class="nodes"><rect x="8" y="8" width="120" height="30" rx="6"/><rect x="172" y="8" width="120" height="30" rx="6" class="weak"/><rect x="90" y="82" width="120" height="30" rx="6" class="concl"/></g>
            <g class="edges"><path d="M68 38 L140 82"/><path d="M232 38 L160 82"/></g>
            ${LT(68, 27, 'P1 · C1 Messung', 'P1 · C1 measurement')}${LT(232, 27, 'P2 · kein Ersatzweg', 'P2 · no backup route')}<text x="150" y="101">C2</text></svg>
            <div class="fd-meta st">${L('P2 wird nirgends begründet: Ist P2 falsch, ist das Argument nicht schlüssig – C2 ist damit nicht widerlegt, aber unbegründet.', 'P2 is justified nowhere: if P2 is false the argument is unsound – which leaves C2 unjustified, not refuted.')}</div>` },
        { you: L('Sie fragen, ob es einen anderen Weg gibt.', 'You ask whether there is another route.'),
          fam: L('Famulus prüft die kausale Struktur und findet den alternativen Weg über Y.', 'Famulus checks the causal structure and finds the alternative route via Y.'),
          cap: L('Kausales Schließen: gibt es einen alternativen Weg?', 'Causal reasoning: is there an alternative route?'),
          pane: () => `<div class="fd-h">${I.bench}<b>${L('Kausalanalyse', 'Causal analysis')}</b> ${SAMPLE}</div>
            <div class="fd-formula st">X · A ∨ Y · A ⇒ U</div>
            <div class="fd-meta st">${L('X zusammen mit A ist kausal relevant für die Harnstoffbildung U; Y zusammen mit A ist ein alternativer Weg. Fehlt nur X, kann Y einspringen – der Knockout allein zeigt keine Entbehrlichkeit.', 'X together with A is causally relevant to urea formation U; Y together with A is an alternative route. If only X is missing, Y can step in – the knock-out alone does not show dispensability.')}</div>` },
        { you: L('Sie prüfen die Daten der Studie.', 'You check the study\'s data.'),
          fam: L('Famulus trennt Belegtes, Fehlendes und die Grenzen der Methode.', 'Famulus separates what is backed, what is missing and the limits of the method.'),
          cap: L('Befunde und Methodik: was die Daten tatsächlich zeigen', 'Findings and method: what the data actually show'),
          pane: () => `<div class="fd-h">${I.literature}<b>${L('Befunde · Methodik', 'Findings · method')}</b> ${SAMPLE}</div>
            <div class="fd-row st"><span class="fd-tag ok">${L('belegt', 'backed')}</span>${L('Harnstoff unverändert, n = 6, Abb. 2', 'Urea unchanged, n = 6, fig. 2')}</div>
            <div class="fd-row st"><span class="fd-tag no">${L('fehlt', 'missing')}</span>${L('Kontrolle: Y zugleich ausgeschaltet', 'Control: Y knocked out as well')}</div>
            <div class="fd-row st"><span class="fd-tag">${L('Grenze', 'limit')}</span>${L('Zellmodell, keine Leberschnitte', 'Cell model, no liver slices')}</div>` },
        { you: L('Sie entscheiden über den nächsten Versuch.', 'You decide on the next experiment.'),
          fam: L('Famulus bewertet jede Behauptung und schlägt den unterscheidenden Versuch vor.', 'Famulus assesses each claim and proposes the experiment that separates them.'),
          cap: L('Bewertung und nächster Versuch, für Ihr Hypothesenbuch', 'Assessment and next experiment, for your hypothesis book'),
          pane: () => `<div class="fd-h">${I.hypotheses}<b>${L('Bewertung', 'Assessment')}</b> ${SAMPLE}</div>
            <div class="fd-verdict st"><b>C1</b>${L('begründet', 'justified')}<i style="--v:85%"></i></div>
            <div class="fd-verdict st"><b>C2</b>${L('nicht begründet', 'not justified')}<i style="--v:25%"></i></div>
            <div class="fd-go st">${I.hypotheses}${L('Vorschlag: X und Y gemeinsam ausschalten', 'Proposal: knock out X and Y together')}</div>` },
      ],
    },
    {
      id: 'bench', icon: 'bench', sample: true, mod: 'bench',
      tab: L('Analytical Bench', 'Analytical bench'),
      steps: [
        { you: L('Sie laden Ihre Messreihe hoch.', 'You upload your measurement series.'),
          fam: L('Famulus übernimmt die Tabelle und prüft sie auf Vollständigkeit.', 'Famulus takes over the table and checks it for completeness.'),
          cap: L('Ihre Messreihe kommt auf die Bench', 'Your series of measurements goes onto the bench'),
          pane: () => `<div class="fd-h">${I.bench}<b>${L('Messreihe', 'Measurements')}</b> ${SAMPLE}</div>
            <table class="fd-tb st"><tr><th>A</th><th>B</th><th>C</th><th>${L('Effekt', 'effect')}</th></tr>
            <tr><td>1</td><td>1</td><td>0</td><td class="y">1</td></tr><tr><td>1</td><td>0</td><td>0</td><td>0</td></tr>
            <tr><td>0</td><td>1</td><td>0</td><td>0</td></tr><tr><td>0</td><td>0</td><td>1</td><td class="y">1</td></tr>
            <tr><td>0</td><td>0</td><td>0</td><td>0</td></tr></table>` },
        { you: L('Sie wollen wissen, was kausal relevant ist.', 'You want to know what is causally relevant.'),
          fam: L('Famulus berechnet die Minimaltheorie und zeichnet sie.', 'Famulus computes the minimal theory and draws it.'),
          cap: L('Die Minimaltheorie: welche Faktoren zusammen kausal relevant sind', 'The minimal theory: which factors are jointly causally relevant'),
          pane: () => `<div class="fd-h">${I.structure}<b>${L('Minimaltheorie', 'Minimal theory')}</b> ${SAMPLE}</div>
            <div class="fd-formula st">A · B ∨ C ⇒ E</div>
            <svg class="fd-cvl st" viewBox="0 0 300 110"><g class="f"><circle cx="40" cy="25" r="14"/><circle cx="40" cy="60" r="14"/><circle cx="40" cy="95" r="12"/><circle cx="260" cy="60" r="16"/></g>
            <text x="40" y="29">A</text><text x="40" y="64">B</text><text x="40" y="99">C</text><text x="260" y="64">E</text>
            <defs><marker id="fdh" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto"><path d="M0 1L9 5L0 9z" fill="#fffdf8" stroke="#002147" stroke-width="1.2"/></marker></defs><path class="e" d="M54 25 Q150 40 242 58"/><path class="e" d="M54 60 L242 60"/><path class="e" d="M52 95 Q150 90 242 64"/><path class="arc" d="M120 34 Q128 46 120 59"/></svg>` },
        { you: L('Sie lesen das Ergebnis in Worten.', 'You read the result in words.'),
          fam: L('Famulus sagt auch, was die Daten nicht entscheiden, und schlägt die fehlende Messung vor.', 'Famulus also says what the data do not decide and proposes the missing measurement.'),
          cap: L('In Worten, mit dem, was die Daten nicht entscheiden', 'In words, with what the data do not decide'),
          pane: () => `<div class="fd-h">${I.reporting}<b>${L('Verbalisierung', 'Verbalisation')}</b> ${SAMPLE}</div>
            <div class="fd-meta st">${L('A zusammen mit B ist kausal relevant für E; C ist ein alternativer Weg zu E.', 'A together with B is causally relevant to E; C is an alternative route to E.')}</div>
            <div class="fd-row st"><span class="fd-tag">${L('offen', 'open')}</span>${L('A·C nie gemessen – ob C ohne A wirkt, bleibt unentschieden', 'A·C never measured – whether C acts without A stays undecided')}</div>
            <div class="fd-go st">${I.hypotheses}${L('Nächste Messung: A = 1, C = 1', 'Next measurement: A = 1, C = 1')}</div>` },
      ],
    },
    {
      id: 'publikation', icon: 'reporting', sample: true, mod: 'reporting',
      tab: L('Publikation', 'Publication'),
      steps: [
        { you: L('Sie beginnen das Manuskript.', 'You start the manuscript.'),
          fam: L('Famulus entwirft es aus Laborbuch, Analysen und Hypothesen, jede Aussage mit ihrer Rechtfertigung.', 'Famulus drafts it from notebook, analyses and hypotheses, every statement with its justification.'),
          cap: L('Aus Laborbuch, Analysen und Hypothesen entsteht das Manuskript', 'Notebook, analyses and hypotheses become the manuscript'),
          pane: () => `<div class="fd-h">${I.reporting}<b>${L('Manuskript · Entwurf', 'Manuscript · draft')}</b> ${SAMPLE}</div>
            <div class="fd-doc"><i class="hd st"></i><i class="st" style="--w:92%"></i><i class="st" style="--w:84%"></i><span class="fd-ref st">[${L('Laborbuch', 'Notebook')} 12.11, S. 4]</span><i class="st" style="--w:88%"></i><i class="st" style="--w:60%"></i><span class="fd-ref st">[${L('Analyse', 'Analysis')} C1 · ${L('Rechtfertigung', 'justification')}]</span></div>` },
        { you: L('Sie reichen ein und warten auf die Gutachten.', 'You submit and wait for the reviews.'),
          fam: L('Famulus verfolgt Fristen und Einwände und ordnet jeden Einwand Ihren Antworten zu.', 'Famulus tracks deadlines and objections and maps each objection to your answers.'),
          cap: L('Einreichung, Gutachten, Revision: jeder Termin im Blick', 'Submission, reviews, revision: every deadline in view'),
          pane: () => `<div class="fd-h">${I.agenda}<b>${L('Publikationsweg', 'Publication path')}</b> ${SAMPLE}</div>
            <div class="fd-ms done st"><i></i><b>1</b>${L('Eingereicht', 'Submitted')}<small>3. Dez.</small></div>
            <div class="fd-ms done st"><i></i><b>2</b>${L('Zwei Gutachten eingegangen', 'Two reviews received')}<small>28. Jan.</small></div>
            <div class="fd-ms run st"><i></i><b>3</b>${L('Revision: 5 Einwände, 3 beantwortet', 'Revision: 5 objections, 3 answered')}<small>${L('Frist 25. Feb.', 'due 25 Feb')}</small></div>` },
        { you: L('Sie brauchen einen Bericht für den Förderer.', 'You need a report for the funder.'),
          fam: L('Famulus stellt ihn auf Knopfdruck zusammen, belegt mit Ihren Einträgen.', 'Famulus assembles it at a click, grounded in your entries.'),
          cap: L('Projekt- und Förderbericht auf Knopfdruck, belegt', 'Project and funder report at a click, grounded'),
          pane: () => `<div class="fd-h">${I.share}<b>${L('Berichte', 'Reports')}</b> ${SAMPLE}</div>
            <div class="fd-share st"><span>${I.collab}${L('Gruppe', 'Group')}</span><span>${I.reporting}${L('Förderbericht', 'Funder report')}</span><span>${I.literature}${L('Manuskript', 'Manuscript')}</span></div>` },
      ],
    },
  ];

  // the second player: Famulus learning from the history of science (pilot section)
  const HISTORY = [
    {
      id: 'pilot', icon: 'notebook', mod: 'hypotheses',
      tab: L('Trainingsfall Krebs & Henseleit, 1931/32', 'Training case Krebs & Henseleit, 1931/32'),
      steps: [
        { mod: 'agenda', cap: L('Der Forschungsrahmen: Warburgs Labor, seine Methode, ein eigenes Labor', 'The research framework: Warburg\'s lab, its method, a lab of one\'s own'),
          pane: () => `<div class="fd-h">${I.agenda}<b>${L('Forschungsrahmen', 'Research framework')}</b></div>${FACTS('rahmen', 'methode', 'labor')}` },
        { mod: 'collab', cap: L('Zwei Forscher, zwei Laborbücher, verteilte und koordinierte Aufgaben', 'Two researchers, two notebooks, distributed and coordinated tasks'),
          pane: () => `<div class="fd-h">${I.collab}<b>${L('Forschergruppe', 'Research group')}</b></div>${FACTS('team', 'laborbuecher', 'koordination')}` },
        { mod: 'literature', cap: L('Die eigene Literatur und der weitere Forschungskontext', 'Their own literature and the wider research context'),
          pane: () => `<div class="fd-h">${I.literature}<b>${L('Literatur', 'Literature')}</b></div>${FACTS('literatur', 'kontext')}` },
        { mod: 'hypotheses', cap: L('Der Hypothesenraum: Stück für Stück ein Reaktionsgraph', 'The hypothesis space: a reaction graph, piece by piece'),
          pane: () => `<div class="fd-h">${I.hypotheses}<b>${L('Hypothesenraum', 'Hypothesis space')}</b></div>${FACTS('hypothesenraum')}
            <svg class="fd-rg st" viewBox="-20 0 340 96"><defs><marker id="rgh" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1L9 5L0 9z" fill="#002147"/></marker></defs>
            <circle cx="30" cy="30" r="5"/><circle cx="160" cy="30" r="5"/><circle cx="290" cy="30" r="5"/><circle cx="100" cy="75" r="5"/><circle cx="220" cy="75" r="5" class="u"/>
            <path d="M36 30H152M166 30H282" marker-end="url(#rgh)"/><path class="q" d="M106 72Q160 55 213 72M225 70L285 36" marker-end="url(#rgh)"/>
            ${'<text x="30" y="16" data-l="de">Aminosäure</text><text x="30" y="16" data-l="en">amino acid</text><text x="160" y="16">NH₃</text><text x="290" y="16" data-l="de">Harnstoff</text><text x="290" y="16" data-l="en">urea</text><text x="100" y="90" data-l="de">Ornithin</text><text x="100" y="90" data-l="en">ornithine</text><text x="220" y="90">?</text>'}</svg>` },
        { mod: 'lab', cap: L('Instrumente und Datenqualität – Famulus legt ein Qualitätsprofil an', 'Instruments and data quality – Famulus builds a quality profile'),
          pane: () => `<div class="fd-h">${I.lab}<b>${L('Methoden · Datenqualität', 'Methods · data quality')}</b></div>${FACTS('instrumente', 'qualitaet')}
            <div class="fd-qp st"><b>${L('Qualitätsprofil (heutige Kategorien)', 'Quality profile (today\'s categories)')}</b><span>${L('Empfindlichkeit', 'sensitivity')}</span><span>${L('Störanfälligkeit', 'interference')}</span><span>${L('Reproduzierbarkeit', 'reproducibility')}</span><span>${L('Kontrollen', 'controls')}</span></div>` },
        { cap: L('Laborbuch, Jahreswende 1931/32: Ornithin wirkt nur zusammen mit Ammoniak', 'Notebook, turn of 1931/32: ornithine acts only together with ammonia'),
          pane: () => `<div class="fd-h">${I.notebook}<b>${L('Laborbuch Krebs · Henseleit', 'Notebooks Krebs · Henseleit')}</b></div>
            <div class="fd-nb st">${L('Ornithin und Ammoniak: beide für die Harnstoffbildung im Lebergewebe nötig', 'Ornithine and ammonia: both needed for urea formation in liver tissue')}</div>
            <div class="fd-meta st">${L('Zusammen ergeben sie noch keine stöchiometrisch ausgeglichene Reaktion – es fehlen weitere Glieder der Kette.', 'Together they do not yet give a stoichiometrically balanced reaction – further links of the chain are missing.')}</div>
            ${SRC('Graßhoff, Casties & Nickelsen 2001, S. 317', 'Graßhoff, Casties & Nickelsen 2001, p. 317')}` },
        { cap: L('Hypothesenbuch: die Ausgangshypothese fällt', 'Hypothesis book: the initial hypothesis falls'),
          pane: () => `<div class="fd-h">${I.hypotheses}<b>${L('Hypothesen', 'Hypotheses')}</b></div>
            <div class="fd-hyp no st">${I.cross}<span><b>${L('Quellenhypothese', 'Source hypothesis')}</b>${L('Ornithin → Ammoniak → Harnstoff', 'ornithine → ammonia → urea')}</span><em>${L('mit den Befunden unvereinbar', 'incompatible with the findings')}</em></div>
            <div class="fd-hyp open st">${I.open}<span><b>${L('Offen', 'Open')}</b>${L('Ornithin + Ammoniak + X → Y', 'ornithine + ammonia + X → Y')}</span><em>${L('Reaktionspfad gesucht', 'reaction path wanted')}</em></div>
            ${SRC('Graßhoff, Casties & Nickelsen 2001, S. 316–317', 'Graßhoff, Casties & Nickelsen 2001, pp. 316–317')}` },
        { cap: L('Welcher Versuch unterscheidet? Die Mengenverhältnisse messen', 'Which experiment separates? Measure the quantities'),
          pane: () => `<div class="fd-h">${I.bench}<b>${L('Nächste Versuche', 'Next experiments')}</b></div>
            <div class="fd-row st"><span class="fd-tag ok">1</span>${L('Ammoniakverbrauch messen (Januar 1932)', 'Measure ammonia consumption (January 1932)')}</div>
            <div class="fd-row st"><span class="fd-tag ok">2</span>${L('Ornithinkonzentration variieren (Anweisung an Henseleit, 14. Januar)', 'Vary the ornithine concentration (instruction to Henseleit, 14 January)')}</div>
            ${SRC('Graßhoff, Casties & Nickelsen 2001, S. 317–318', 'Graßhoff, Casties & Nickelsen 2001, pp. 317–318')}` },
        { cap: L('Die Prüfaufgabe: den nächsten Versuch aus dem Stand des Laborbuchs vorhersagen', 'The test: predict the next experiment from the state of the notebook'),
          pane: () => `<div class="fd-h">${I.hypotheses}<b>${L('Famulus · Prüfaufgabe des Piloten', 'Famulus · the pilot\'s test task')}</b></div>
            <div class="fd-pred st"><span>${L('Stand: Ornithin und Ammoniak nötig, Quellenhypothese gefallen', 'State: ornithine and ammonia needed, source hypothesis fallen')}</span></div>
            <div class="fd-pred st"><b>${L('Vorschlag', 'Proposal')}</b><span>${L('Quantitative Beiträge von Ornithin und Ammoniak bestimmen', 'Determine the quantitative contributions of ornithine and ammonia')}</span></div>
            <div class="fd-pred ok st">${I.check}<span>${L('Das taten Krebs und Henseleit als Nächstes.', 'That is what Krebs and Henseleit did next.')}</span></div>
            ${SRC('Graßhoff, Casties & Nickelsen 2001, S. 317–318', 'Graßhoff, Casties & Nickelsen 2001, pp. 317–318')}` },
        { cap: L('Das Modell wird erweitert: Arginin, dann Citrullin – der Zyklus', 'The model is extended: arginine, then citrulline – the cycle'),
          pane: () => `<div class="fd-h">${I.structure}<b>${L('Reaktionsmodell', 'Reaction model')}</b></div>
            <svg class="fd-cycle st" viewBox="0 0 300 150"><circle cx="150" cy="75" r="50" class="ring"/>
            <g class="n"><circle cx="150" cy="25" r="5"/><circle cx="193" cy="100" r="5"/><circle cx="107" cy="100" r="5"/></g>
            ${LT(150, 13, 'Ornithin', 'ornithine')}${LT(245, 112, 'Citrullin', 'citrulline')}${LT(55, 112, 'Arginin', 'arginine')}
            <path class="out" d="M100 90 L40 60"/>${LT(30, 50, 'Harnstoff', 'urea')}
            <path class="in" d="M260 40 L190 55"/><text x="268" y="34">NH₃</text></svg>
            <div class="fd-meta st">${L('Arginin → Ornithin + Harnstoff war bekannt; Citrullin kommt als Zwischenprodukt hinzu. 1932: der erste Reaktionszyklus der Biochemie.', 'Arginine → ornithine + urea was known; citrulline is added as the intermediate. 1932: the first reaction cycle in biochemistry.')}</div>
            ${SRC('Graßhoff 1998, S. 85, 89–90', 'Graßhoff 1998, pp. 85, 89–90')}` },
        { cap: L('Was Famulus daraus lernt: eine übertragbare Forschungsstrategie', 'What Famulus learns from it: a transferable research strategy'),
          pane: () => `<div class="fd-h">${I.fam}<b>${L('Lernziel · Vision', 'Learning goal · vision')}</b></div>
            <div class="fd-row st"><span class="fd-tag no">1</span>${L('Ein Befund widerspricht der Ausgangshypothese', 'A finding contradicts the initial hypothesis')}</div>
            <div class="fd-row st"><span class="fd-tag">2</span>${L('Die beteiligten Faktoren quantitativ bestimmen', 'Determine the factors involved quantitatively')}</div>
            <div class="fd-row st"><span class="fd-tag ok">3</span>${L('Den Reaktionspfad um bekannte Glieder erweitern', 'Extend the reaction path by known links')}</div>
            <div class="fd-meta st">${L('Aus wenigen gut erforschten Episoden lernt Famulus, wie erfolgreiche Forschung vorgeht, und überträgt die Strategie auf vergleichbare Probleme heutiger Forschung.', 'From a few well-researched episodes Famulus learns how successful research proceeds, and transfers the strategy to comparable problems of today\'s research.')}</div>
            ${SRC('Schritte 1–3 nach Graßhoff, Casties & Nickelsen 2001, S. 316–318, und Graßhoff 1998, S. 89–90; Lernziel: Projektmemo 1 (26. Okt. 2026)', 'steps 1–3 after Graßhoff, Casties & Nickelsen 2001, pp. 316–318, and Graßhoff 1998, pp. 89–90; learning goal: project memo 1 (26 Oct 2026)')}` },
      ],
    },
  ];

  // ---------- one player per root ----------
  function player(root, SCENES) {
  const tabs = h('div', 'fd-tabs'); tabs.setAttribute('role', 'tablist');
  const win = h('div', 'fd-win');
  const steps = h('ol', 'fd-steps');
  const app = h('div', 'fd-app');
  const rail = h('div', 'fd-rail');
  RAIL.forEach(m => { const r = h('span', 'fd-ri', I[m]); r.dataset.m = m; rail.appendChild(r); });
  const main = h('div', 'fd-main');
  const bar = h('div', 'fd-bar', '<i></i><i></i><i></i><span>Famulus Science</span>');
  const clock = h('div', 'fd-clock'); bar.appendChild(clock);
  const pane = h('div', 'fd-pane');
  main.append(bar, pane); app.append(rail, main);
  const cap = h('div', 'fd-cap');
  const ctl = h('div', 'fd-ctl');
  const bPrev = h('button', 'fd-btn', I.prev), bPlay = h('button', 'fd-btn play', I.pause), bNext = h('button', 'fd-btn', I.next);
  bPrev.type = bPlay.type = bNext.type = 'button';
  bPrev.setAttribute('aria-label', 'zurück / back'); bNext.setAttribute('aria-label', 'weiter / next'); bPlay.setAttribute('aria-label', 'Pause / Play');
  ctl.append(bPrev, bPlay, bNext);
  const stage = h('div', 'fd-stage'); stage.append(steps, app);
  win.append(stage, cap, ctl);
  root.append(tabs, win);

  SCENES.forEach((sc, i) => {
    const t = h('button', 'fd-tab', I[sc.icon] + sc.tab + '<span class="fd-tp"></span>');
    t.type = 'button'; t.setAttribute('role', 'tab');
    t.addEventListener('click', () => { go(i, 0); });
    tabs.appendChild(t);
  });

  let ci = 0, si = 0, playing = !RM, timer = null, visible = false;
  const DWELL = 4200;

  function render() {
    const sc = SCENES[ci];
    [...tabs.children].forEach((t, i) => t.setAttribute('aria-selected', i === ci ? 'true' : 'false'));
    steps.innerHTML = '';
    sc.steps.forEach((st, i) => {
      const li = h('li'); const b = h('button', 'fd-step' + (i === si ? ' on' : i < si ? ' done' : ''), `<b>${i + 1}</b><span>${st.time ? `<em class="fd-t">${st.time}</em>` : ''}${st.cap}</span>`);
      b.type = 'button'; b.addEventListener('click', () => go(ci, i)); li.appendChild(b); steps.appendChild(li);
    });
    const st = sc.steps[si];
    [...rail.children].forEach(r => r.classList.toggle('on', r.dataset.m === (st.mod || sc.mod)));
    win.classList.toggle('night', !!st.night);
    clock.innerHTML = st.time ? (st.night ? I.moon : I.sun) + st.time : '';
    const who = st.you ? `<div class="fd-who"><div class="you st">${I.person}<b>${L('Sie', 'You')}</b><span>${st.you}</span></div><div class="fam st">${I.fam}<b>Famulus</b><span>${st.fam}</span></div></div>` : '';
    let body = st.pane().trim(), head = '';
    if (body.startsWith('<div class="fd-h">')) { const k = body.indexOf('</div>') + 6; head = body.slice(0, k); body = body.slice(k); }
    else if (st.you) head = `<div class="fd-h"><b>${st.cap}</b> ${sc.sample ? SAMPLE : ''}</div>`;
    pane.innerHTML = head + who + body;
    cap.innerHTML = sc.steps[si].cap;
    const items = pane.querySelectorAll('.st');
    items.forEach((e, k) => { if (RM) e.classList.add('in'); else setTimeout(() => e.classList.add('in'), 120 + k * 260); });
    const tp = tabs.children[ci].querySelector('.fd-tp');
    [...tabs.querySelectorAll('.fd-tp')].forEach(x => { x.style.transition = 'none'; x.style.width = '0'; });
    if (playing && visible) { void tp.offsetWidth; const d = st.you ? 7000 : DWELL; tp.style.width = (si / sc.steps.length * 100) + '%'; void tp.offsetWidth; tp.style.transition = `width ${d}ms linear`; tp.style.width = ((si + 1) / sc.steps.length * 100) + '%'; }
  }
  function schedule() { clearTimeout(timer); const st = SCENES[ci].steps[si]; if (playing && visible) timer = setTimeout(advance, st.you ? 7000 : DWELL); }
  function advance() {
    const sc = SCENES[ci];
    if (si < sc.steps.length - 1) si++; else { ci = (ci + 1) % SCENES.length; si = 0; }
    render(); schedule();
  }
  function go(c, s) { ci = c; si = s; render(); schedule(); }
  function setPlay(p) { playing = p; bPlay.innerHTML = p ? I.pause : I.play; render(); schedule(); }
  bPlay.addEventListener('click', () => setPlay(!playing));
  bNext.addEventListener('click', () => { const sc = SCENES[ci]; if (si < sc.steps.length - 1) go(ci, si + 1); else go((ci + 1) % SCENES.length, 0); });
  bPrev.addEventListener('click', () => { if (si > 0) go(ci, si - 1); else { const c = (ci + SCENES.length - 1) % SCENES.length; go(c, SCENES[c].steps.length - 1); } });

  const want = SCENES.findIndex(s => s.id === P.get('fd'));
  if (want >= 0) { ci = want; si = Math.max(0, Math.min(SCENES[ci].steps.length - 1, (parseInt(P.get('s'), 10) || 1) - 1)); playing = false; }
  bPlay.innerHTML = playing ? I.pause : I.play;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(es => { visible = es[0].isIntersecting; render(); schedule(); }, { threshold: 0.35 }).observe(win);
  } else { visible = true; }
  render(); schedule();
  }
  const r1 = document.getElementById('fd'), r2 = document.getElementById('fd-hist');
  if (r1) player(r1, SCENES);
  if (r2) player(r2, HISTORY);
})();
