// happy-dom's CSS parser crashes when Ionic's Stencil runtime calls
// CSSStyleSheet.replaceSync()/replace() with an undefined stylesheet string
// (happens when an ion-item contains a coloured ion-label). The throw aborts
// the custom-element upgrade and the element's text children never render.
// oxlint-disable-next-line typescript/unbound-method -- rebound via .call below
const originalReplaceSync = CSSStyleSheet.prototype.replaceSync;
CSSStyleSheet.prototype.replaceSync = function (text?: string) {
  return originalReplaceSync.call(this, text ?? "");
};

// oxlint-disable-next-line typescript/unbound-method -- rebound via .call below
const originalReplace = CSSStyleSheet.prototype.replace;
CSSStyleSheet.prototype.replace = function (text?: string) {
  return originalReplace.call(this, text ?? "");
};
