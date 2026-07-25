// navbar.js — unified left navigation for the GWEA 2.0 training set.
// The "Serving the Stakeholder" group is a collapsible list of the 17 artefacts.
(function () {
  var STK = [
    ["serving-stakeholders.html", "Stakeholder map"],
    ["health-report.html", "Architecture Health Report"],
    ["outcome-realisation.html", "Outcome Realisation Map"],
    ["capability-risk.html", "Capability Risk Register"],
    ["service-catalogue.html", "Government Service Catalogue"],
    ["workforce-readiness.html", "Workforce & Skills Readiness"],
    ["impact-report.html", "Digital Transformation Impact"],
    ["conformance-dashboard.html", "Conformance Dashboard"],
    ["omf-compliance.html", "OMF Compliance Dashboard"],
    ["cyber-maturity.html", "Cyber Security Maturity"],
    ["maturity-assessment.html", "Maturity Assessment Report"],
    ["root-cause.html", "Root Cause & Gap Analysis"],
    ["investment-case.html", "Strategic Investment Case"],
    ["duplication-savings.html", "Duplication & Savings Report"],
    ["system-rationalisation.html", "System Rationalisation Roadmap"],
    ["technology-catalogue.html", "Technology-Layer Catalogue"],
    ["ee-readiness-profile.html", "Enabling-Environment Readiness"],
    ["ea-roadmap.html", "EA Roadmap — Change & Adoption"]
  ];
  var NAV = [
    {grp: "Start here"},
    {href: "purpose.html", label: "Purpose", acc: "#1a3a5c", dot: "#1a3a5c"},
    {href: "index.html", label: "Overview", acc: "#8fa0ac", dot: "#8fa0ac"},
    {href: "phase0.html", label: "Phase 0 · Maturity baseline", acc: "#7a8b99", dot: "#7a8b99"},
    {grp: "The GWEA 2.0 process"},
    {href: "phase1.html", label: "Phase 1 · Cataloguing", acc: "#2f9e5b", dot: "#2f9e5b"},
    {href: "phase2.html", label: "Phase 2 · Assessment", acc: "#177a60", dot: "#177a60"},
    {href: "phase3.html", label: "Phase 3 · Roadmap", acc: "#2c6ca3", dot: "#2c6ca3"},
    {href: "phase4.html", label: "Phase 4 · Remedial", acc: "#a5402a", dot: "#a5402a"},
    {href: "phase5.html", label: "Phase 5 · Governance", acc: "#5b4fa0", dot: "#5b4fa0"},
    {grp: "Cross-cutting"},
    {href: "enabling-environment.html", label: "Enabling Environment", acc: "#b07d1c", dot: "#b07d1c"},
    {grp: "Serving the Stakeholder"},
    {collapse: "stk", label: "Stakeholder artefacts (17)", dot: "#0F6E56", acc: "#0F6E56", children: STK}
  ];
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (here === "") here = "index.html";
  var inStk = STK.some(function (c) { return c[0].toLowerCase() === here; });
  var html = '<div class="brand"><b>Building exemplary public institutions by design</b><span>GWEA 2.0 · The methodology</span></div>';
  NAV.forEach(function (n) {
    if (n.grp) { html += '<div class="grp">' + n.grp + '</div>'; return; }
    if (n.collapse) {
      var op = inStk ? " open" : "";
      html += '<div class="collapse-hdr' + op + '" data-collapse="' + n.collapse + '">' +
              '<span class="dot" style="background:' + n.dot + '"></span>' + n.label +
              '<span class="caret">&#9656;</span></div>';
      html += '<div class="subnav' + op + '" id="sub-' + n.collapse + '">' +
        n.children.map(function (c) {
          var act = (c[0].toLowerCase() === here) ? " active" : "";
          return '<a href="' + c[0] + '" class="sub-child' + act + '">' + c[1] + '</a>';
        }).join('') + '</div>';
      return;
    }
    var active = (n.href.toLowerCase() === here) ? " active" : "";
    html += '<a href="' + n.href + '" class="' + active.trim() + '" style="--acc:' + n.acc + '">' +
            '<span class="dot" style="background:' + n.dot + '"></span>' + n.label + '</a>';
  });
  var el = document.createElement("nav");
  el.id = "gwea-nav";
  el.innerHTML = html;
  document.body.insertBefore(el, document.body.firstChild);
  el.querySelectorAll(".collapse-hdr").forEach(function (h) {
    h.addEventListener("click", function () {
      h.classList.toggle("open");
      document.getElementById("sub-" + h.getAttribute("data-collapse")).classList.toggle("open");
    });
  });
})();
