/* @ds-bundle: {"format":4,"namespace":"SamrukKazynaDesignSystem_ebccd6","components":[{"name":"DateTabs","sourcePath":"components/content/DateTabs.jsx"},{"name":"DotPager","sourcePath":"components/content/DotPager.jsx"},{"name":"HeroSlide","sourcePath":"components/content/HeroSlide.jsx"},{"name":"InfoCard","sourcePath":"components/content/InfoCard.jsx"},{"name":"LogoTile","sourcePath":"components/content/LogoTile.jsx"},{"name":"NewsCard","sourcePath":"components/content/NewsCard.jsx"},{"name":"NominationCard","sourcePath":"components/content/NominationCard.jsx"},{"name":"SectionDivider","sourcePath":"components/content/SectionDivider.jsx"},{"name":"SectionTitle","sourcePath":"components/content/SectionTitle.jsx"},{"name":"StatCounter","sourcePath":"components/content/StatCounter.jsx"},{"name":"ArrowLink","sourcePath":"components/core/ArrowLink.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"SocialIcon","sourcePath":"components/core/SocialIcon.jsx"},{"name":"CompanyPicker","sourcePath":"components/forms/CompanyPicker.jsx"},{"name":"SearchInput","sourcePath":"components/forms/SearchInput.jsx"},{"name":"SelectField","sourcePath":"components/forms/SelectField.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"LangSelect","sourcePath":"components/navigation/LangSelect.jsx"},{"name":"NavDropdown","sourcePath":"components/navigation/NavDropdown.jsx"},{"name":"PortalHeader","sourcePath":"components/navigation/PortalHeader.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"}],"sourceHashes":{"components/content/DateTabs.jsx":"1aa327736b9c","components/content/DotPager.jsx":"7fb707ade1ba","components/content/HeroSlide.jsx":"e85ac722178c","components/content/InfoCard.jsx":"630829747dc4","components/content/LogoTile.jsx":"002ac7f95083","components/content/NewsCard.jsx":"f57b9047ce6f","components/content/NominationCard.jsx":"a02247b20baa","components/content/SectionDivider.jsx":"4c48d12ae5cb","components/content/SectionTitle.jsx":"f24705381585","components/content/StatCounter.jsx":"2c8cec5c82f3","components/core/ArrowLink.jsx":"1c04d0908012","components/core/Button.jsx":"91812ec6410b","components/core/Icon.jsx":"6691325dbcc2","components/core/SocialIcon.jsx":"da0e9665eb55","components/forms/CompanyPicker.jsx":"427b1bde591c","components/forms/SearchInput.jsx":"ca6cf9af2654","components/forms/SelectField.jsx":"e224cc7716dc","components/forms/TextField.jsx":"6dcaf6da4aac","components/navigation/LangSelect.jsx":"8d68f38325a2","components/navigation/NavDropdown.jsx":"fac8fbb817b3","components/navigation/PortalHeader.jsx":"a62137218b94","components/navigation/SiteFooter.jsx":"651ca148b944","components/navigation/SiteHeader.jsx":"223abab816cd","ui_kits/qsamruk/PortalHero.jsx":"b47e86621bdd","ui_kits/qsamruk/PortalSections.jsx":"9527c8fc2cb1","ui_kits/qsamruk/data.jsx":"4987492b7459","ui_kits/qsamruk/main.jsx":"6cb7daa7dfd9","ui_kits/sk-kz/HomeHero.jsx":"9aef457d50af","ui_kits/sk-kz/HomeSections.jsx":"9f6d448f0bcb","ui_kits/sk-kz/Loader.jsx":"604bb7d77f38","ui_kits/sk-kz/data.jsx":"d94724356ffb","ui_kits/sk-kz/main.jsx":"cc4fb2aa0aa3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SamrukKazynaDesignSystem_ebccd6 = window.SamrukKazynaDesignSystem_ebccd6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/DateTabs.jsx
try { (() => {
function DateTabs({
  items = [],
  active = 0,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(' + items.length + ',1fr)',
      gap: 1,
      background: 'var(--sk-grey-300)'
    }
  }, items.map((d, i) => {
    const on = i === active;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      onClick: () => onChange && onChange(i),
      style: {
        position: 'relative',
        height: 'var(--date-tab-h)',
        border: 'none',
        cursor: 'pointer',
        background: on ? 'var(--accent-primary-dark)' : 'var(--accent-tan)',
        color: 'var(--sk-white)',
        fontFamily: 'var(--font-corporate)',
        fontSize: 18,
        transition: 'background var(--dur-base)'
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: '50%',
        top: -11,
        width: 22,
        height: 22,
        background: 'var(--accent-primary-dark)',
        transform: 'translateX(-50%) rotate(45deg)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 6,
        top: 6,
        width: 9,
        height: 9,
        background: 'var(--sk-white)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative'
      }
    }, d));
  }));
}
Object.assign(__ds_scope, { DateTabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/DateTabs.jsx", error: String((e && e.message) || e) }); }

// components/content/DotPager.jsx
try { (() => {
function DotPager({
  count = 6,
  active = 0,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, Array.from({
    length: count
  }).map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    "aria-label": 'Page ' + (i + 1),
    onClick: () => onChange && onChange(i),
    style: {
      width: 16,
      height: 16,
      padding: 0,
      borderRadius: '50%',
      border: '2px solid var(--sk-gold-600)',
      background: i === active ? 'var(--sk-gold-600)' : 'var(--sk-white)',
      cursor: 'pointer',
      transition: 'background var(--dur-fast)'
    }
  })));
}
Object.assign(__ds_scope, { DotPager });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/DotPager.jsx", error: String((e && e.message) || e) }); }

// components/content/InfoCard.jsx
try { (() => {
function InfoCard({
  title,
  children,
  image,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card-muted)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'var(--card-bar-h)',
      background: 'var(--accent-gold)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '38px 26px 20px',
      flex: 1,
      fontFamily: 'var(--font-corporate)',
      color: 'var(--text-heading)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 30px',
      fontSize: 'var(--fs-h3)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-caps)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      lineHeight: '23px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, children)), image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: 230,
      objectFit: 'cover',
      display: 'block'
    }
  }));
}
Object.assign(__ds_scope, { InfoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/InfoCard.jsx", error: String((e && e.message) || e) }); }

// components/content/LogoTile.jsx
try { (() => {
function LogoTile({
  src,
  alt = '',
  href = '#',
  height = 180
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height,
      padding: 12,
      boxSizing: 'border-box',
      transform: h ? 'translateY(-3px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  }));
}
Object.assign(__ds_scope, { LogoTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/LogoTile.jsx", error: String((e && e.message) || e) }); }

// components/content/NominationCard.jsx
try { (() => {
function NominationCard({
  logo,
  prefix = 'В номинации',
  nomination
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 230,
      padding: '14px 16px 22px',
      boxSizing: 'border-box',
      border: '1px solid var(--border-gold)',
      background: 'var(--sk-white)',
      boxShadow: h ? 'var(--shadow-tile)' : 'none',
      transition: 'box-shadow var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 84,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, logo && /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "",
    style: {
      maxHeight: 84,
      maxWidth: '100%'
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '26px 0 0',
      textAlign: 'center',
      fontFamily: 'var(--font-portal)',
      fontSize: 15,
      lineHeight: '25px',
      color: 'var(--sk-ink)'
    }
  }, prefix, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500
    }
  }, "\xAB", nomination, "\xBB")));
}
Object.assign(__ds_scope, { NominationCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/NominationCard.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionDivider.jsx
try { (() => {
function SectionDivider({
  title,
  titleColor = '#333',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-corporate)',
      margin: '0 auto',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      height: 40
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sk-border-ornament",
    style: {
      flex: 1,
      height: 18
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "sk-bird",
    style: {
      width: 34,
      height: 40,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "sk-border-ornament",
    style: {
      flex: 1,
      height: 18
    }
  })), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '22px 0 0',
      textAlign: 'center',
      fontFamily: 'var(--font-corporate)',
      fontWeight: 400,
      fontSize: 'var(--fs-display)',
      lineHeight: 1.2,
      color: titleColor
    }
  }, title));
}
Object.assign(__ds_scope, { SectionDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionDivider.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionTitle.jsx
try { (() => {
function SectionTitle({
  children,
  align = 'center',
  underline = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-portal)',
      fontWeight: 700,
      fontSize: 'var(--fs-portal-h2)',
      lineHeight: 1.2,
      textTransform: 'uppercase',
      color: '#111'
    }
  }, children), underline && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 136,
      height: 3,
      background: 'var(--accent-gold)',
      margin: align === 'center' ? '12px auto 0' : '12px 0 0'
    }
  }));
}
Object.assign(__ds_scope, { SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// components/content/StatCounter.jsx
try { (() => {
function StatCounter({
  label,
  value,
  tone = 'light'
}) {
  const c = tone === 'light' ? 'var(--sk-white)' : 'var(--sk-navy-900)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontFamily: 'var(--font-portal)',
      color: c
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 500
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-portal-stat)',
      fontWeight: 600,
      marginTop: 8,
      letterSpacing: '.01em'
    }
  }, value));
}
Object.assign(__ds_scope, { StatCounter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatCounter.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const V = {
  primary: {
    background: 'var(--sk-navy-900)',
    color: 'var(--sk-white)',
    border: '1px solid var(--sk-navy-900)'
  },
  gold: {
    background: 'var(--sk-gold-500)',
    color: 'var(--sk-white)',
    border: '1px solid var(--sk-gold-500)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--sk-navy-900)',
    border: '1px solid var(--sk-navy-900)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--sk-navy-900)',
    border: '1px solid transparent'
  }
};
const S = {
  sm: {
    height: 32,
    padding: '0 20px',
    fontSize: 14
  },
  md: {
    height: 37,
    padding: '0 45px',
    fontSize: 15
  },
  lg: {
    height: 48,
    padding: '0 60px',
    fontSize: 16
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  children,
  style
}) {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxSizing: 'border-box',
      width: fullWidth ? '100%' : undefined,
      fontFamily: 'var(--font-portal)',
      fontWeight: 500,
      borderRadius: 'var(--radius-sm)',
      cursor: disabled ? 'default' : 'pointer',
      whiteSpace: 'nowrap',
      transition: 'filter var(--dur-fast) var(--ease-standard), opacity var(--dur-fast)',
      filter: disabled ? 'none' : p ? 'brightness(.88)' : h ? 'brightness(1.1)' : 'none',
      opacity: disabled ? .45 : 1,
      ...S[size],
      ...V[variant],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
const CDN = 'https://unpkg.com/lucide-static@0.460.0/icons/';
function Icon({
  name = 'circle',
  size = 20,
  color = 'currentColor',
  style,
  title
}) {
  const url = 'url(' + CDN + name + '.svg)';
  return /*#__PURE__*/React.createElement("span", {
    role: title ? 'img' : undefined,
    "aria-label": title,
    "aria-hidden": title ? undefined : true,
    style: {
      display: 'inline-block',
      flex: 'none',
      width: size,
      height: size,
      backgroundColor: color,
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/content/NewsCard.jsx
try { (() => {
function NewsCard({
  title,
  date,
  views,
  image,
  href = '#'
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 290,
      border: '1px solid var(--sk-grey-500)',
      textDecoration: 'none',
      background: h ? 'var(--sk-white)' : 'transparent',
      transition: 'background var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '6px 7px 10px',
      fontFamily: 'var(--font-corporate)',
      fontSize: 16,
      lineHeight: '20px',
      color: h ? 'var(--text-heading)' : 'var(--sk-ink)'
    }
  }, title), image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      aspectRatio: '4/3',
      objectFit: 'cover',
      display: 'block',
      marginTop: 'auto'
    }
  }), (date || views != null) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 7px',
      marginTop: image ? 0 : 'auto',
      fontFamily: 'var(--font-corporate)',
      fontSize: 14,
      color: 'var(--sk-grey-700)'
    }
  }, /*#__PURE__*/React.createElement("span", null, date), views != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "eye",
    size: 15,
    color: "var(--sk-grey-500)"
  }), views)));
}
Object.assign(__ds_scope, { NewsCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/NewsCard.jsx", error: String((e && e.message) || e) }); }

// components/core/ArrowLink.jsx
try { (() => {
function ArrowLink({
  href = '#',
  children = 'More',
  color = 'var(--sk-blue-600)',
  direction = 'right',
  onClick,
  style
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: h ? 30 : 24,
      color,
      fontFamily: 'var(--font-corporate)',
      fontSize: 18,
      textDecoration: 'none',
      transition: 'gap var(--dur-base) var(--ease-standard)',
      ...style
    }
  }, direction === 'left' && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-left",
    size: 20,
    color: color
  }), /*#__PURE__*/React.createElement("span", null, children), direction === 'right' && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 20,
    color: color
  }));
}
Object.assign(__ds_scope, { ArrowLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ArrowLink.jsx", error: String((e && e.message) || e) }); }

// components/content/HeroSlide.jsx
try { (() => {
function HeroSlide({
  title,
  excerpt,
  image,
  href = '#',
  moreLabel = 'More',
  onPrev,
  onNext
}) {
  const arrow = (n, fn, pos) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": n,
    onClick: fn,
    style: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      [pos]: 26,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 6,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: n === 'prev' ? 'chevron-left' : 'chevron-right',
    size: 34,
    color: "var(--sk-navy-900)"
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      height: 'var(--hero-h)',
      background: 'var(--sk-white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '36px 110px 40px 100px',
      overflow: 'hidden'
    }
  }, onPrev && arrow('prev', onPrev, 'left'), /*#__PURE__*/React.createElement("span", {
    className: "sk-watermark",
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 150,
      height: 116
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-corporate)',
      fontWeight: 700,
      fontSize: 64,
      lineHeight: .9,
      color: 'var(--sk-gold-500)',
      height: 36
    }
  }, "\u201C"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '22px 0 0',
      fontFamily: 'var(--font-corporate)',
      fontWeight: 400,
      fontSize: 'var(--fs-h1)',
      lineHeight: '35px',
      color: 'var(--text-heading)',
      textWrap: 'pretty'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 2,
      background: 'var(--sk-ink)',
      margin: '22px 0 18px'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-corporate)',
      fontSize: 16,
      lineHeight: '24px',
      color: 'var(--sk-ink)'
    }
  }, excerpt), /*#__PURE__*/React.createElement(__ds_scope.ArrowLink, {
    href: href,
    style: {
      marginTop: 28
    }
  }, moreLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--sk-grey-300)'
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), onNext && arrow('next', onNext, 'right')));
}
Object.assign(__ds_scope, { HeroSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/HeroSlide.jsx", error: String((e && e.message) || e) }); }

// components/core/SocialIcon.jsx
try { (() => {
const MAP = {
  facebook: 'facebook',
  youtube: 'youtube',
  instagram: 'instagram',
  telegram: 'send'
};
function SocialIcon({
  network = 'facebook',
  href = '#',
  size = 44,
  tone = 'light'
}) {
  const [h, setH] = React.useState(false);
  const c = tone === 'light' ? 'var(--sk-white)' : 'var(--sk-navy-900)';
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    "aria-label": network,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      border: '1px solid ' + (tone === 'light' ? 'rgba(255,255,255,.35)' : 'var(--sk-grey-300)'),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: h ? tone === 'light' ? 'rgba(255,255,255,.12)' : 'var(--sk-grey-100)' : 'transparent',
      transition: 'background var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: MAP[network] || network,
    size: Math.round(size * .42),
    color: c
  }));
}
Object.assign(__ds_scope, { SocialIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SocialIcon.jsx", error: String((e && e.message) || e) }); }

// components/forms/CompanyPicker.jsx
try { (() => {
function CompanyPicker({
  label = 'All companies',
  onClick,
  width = 362
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      alignItems: 'stretch',
      width,
      height: 60,
      padding: 0,
      background: 'var(--sk-white)',
      border: '1px solid var(--sk-grey-400)',
      cursor: 'pointer',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 34px',
      fontFamily: 'var(--font-corporate)',
      fontSize: 18,
      color: h ? 'var(--sk-navy-900)' : 'var(--sk-ink)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderLeft: '1px solid var(--sk-grey-400)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "briefcase",
    size: 30,
    color: "var(--sk-gold-500)"
  })));
}
Object.assign(__ds_scope, { CompanyPicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/CompanyPicker.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchInput.jsx
try { (() => {
function SearchInput({
  placeholder = 'Введите название вакансии или компании',
  value,
  onChange,
  onSubmit,
  style
}) {
  const [v, setV] = React.useState(value || '');
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSubmit && onSubmit(v);
    },
    style: {
      position: 'relative',
      display: 'flex',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: v,
    placeholder: placeholder,
    onChange: e => {
      setV(e.target.value);
      onChange && onChange(e.target.value);
    },
    style: {
      flex: 1,
      minWidth: 0,
      height: 37,
      padding: '0 40px 0 14px',
      boxSizing: 'border-box',
      border: '1px solid var(--border-input)',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-portal)',
      fontSize: 14,
      color: 'var(--sk-ink)',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    "aria-label": "Search",
    style: {
      position: 'absolute',
      right: 6,
      top: 0,
      height: 37,
      width: 30,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 18,
    color: "var(--sk-gold-500)"
  })));
}
Object.assign(__ds_scope, { SearchInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/SelectField.jsx
try { (() => {
function SelectField({
  label,
  options = [],
  value,
  defaultValue = '',
  placeholder,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-portal)',
      fontSize: 17,
      fontWeight: 500,
      color: 'var(--sk-grey-700)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    defaultValue: value === undefined ? defaultValue : undefined,
    onChange: e => onChange && onChange(e.target.value),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: 'var(--control-h)',
      padding: '0 36px 0 14px',
      boxSizing: 'border-box',
      border: '1px solid var(--border-input)',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-portal)',
      fontSize: 15,
      color: 'var(--sk-grey-700)',
      background: 'var(--sk-white)'
    }
  }, placeholder !== undefined && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 14,
    color: "var(--sk-grey-500)",
    style: {
      position: 'absolute',
      right: 12,
      top: 14,
      pointerEvents: 'none'
    }
  })));
}
Object.assign(__ds_scope, { SelectField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SelectField.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function TextField({
  label,
  value,
  defaultValue,
  placeholder,
  onChange,
  type = 'text',
  disabled = false,
  error,
  style
}) {
  const [f, setF] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-portal)',
      fontSize: 17,
      fontWeight: 500,
      color: 'var(--sk-grey-700)'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      height: 'var(--control-h)',
      padding: '0 14px',
      boxSizing: 'border-box',
      border: '1px solid ' + (error ? '#C0392B' : f ? 'var(--sk-navy-900)' : 'var(--border-input)'),
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-portal)',
      fontSize: 15,
      color: 'var(--sk-ink)',
      background: disabled ? 'var(--sk-grey-50)' : 'var(--sk-white)',
      outline: 'none'
    }
  }), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-portal)',
      fontSize: 13,
      color: '#C0392B'
    }
  }, error));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/LangSelect.jsx
try { (() => {
function LangSelect({
  value = 'Eng',
  options = ['Қаз', 'Рус', 'Eng'],
  onChange,
  variant = 'corporate'
}) {
  const [o, setO] = React.useState(false);
  const portal = variant === 'portal';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-block'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setO(!o),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: portal ? 37 : 'auto',
      padding: portal ? '0 12px 0 16px' : '0',
      background: portal ? 'var(--sk-white)' : 'transparent',
      border: portal ? '1px solid var(--border-input)' : 'none',
      borderRadius: portal ? 'var(--radius-sm)' : 0,
      fontFamily: portal ? 'var(--font-portal)' : 'var(--font-corporate)',
      fontSize: portal ? 15 : 16,
      color: 'var(--sk-ink)',
      cursor: 'pointer'
    }
  }, value, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 14,
    color: portal ? 'var(--sk-grey-500)' : 'var(--sk-ink)'
  })), o && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 6,
      minWidth: '100%',
      background: 'var(--sk-white)',
      boxShadow: 'var(--shadow-dropdown)',
      zIndex: 20
    }
  }, options.map(l => /*#__PURE__*/React.createElement("div", {
    key: l,
    onClick: () => {
      setO(false);
      onChange && onChange(l);
    },
    style: {
      padding: '8px 16px',
      fontFamily: portal ? 'var(--font-portal)' : 'var(--font-corporate)',
      fontSize: 15,
      cursor: 'pointer',
      color: l === value ? 'var(--sk-gold-500)' : 'var(--sk-ink)'
    }
  }, l))));
}
Object.assign(__ds_scope, { LangSelect });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/LangSelect.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavDropdown.jsx
try { (() => {
function NavDropdown({
  items = [],
  activeIndex = -1,
  onSelect,
  width = 368,
  style
}) {
  const [h, setH] = React.useState(-1);
  return /*#__PURE__*/React.createElement("div", {
    role: "menu",
    style: {
      width,
      background: 'var(--surface-dropdown)',
      boxShadow: 'var(--shadow-dropdown)',
      padding: '0 0 8px',
      boxSizing: 'border-box',
      ...style
    }
  }, items.map((it, i) => {
    const on = i === h || i === activeIndex;
    return /*#__PURE__*/React.createElement("a", {
      key: i,
      role: "menuitem",
      href: it.href || '#',
      onClick: e => {
        if (onSelect) {
          e.preventDefault();
          onSelect(i, it);
        }
      },
      onMouseEnter: () => setH(i),
      onMouseLeave: () => setH(-1),
      style: {
        display: 'block',
        padding: '8px 15px',
        fontFamily: 'var(--font-corporate)',
        fontSize: 16,
        lineHeight: '18px',
        color: 'var(--sk-ink)',
        textDecoration: 'none',
        background: on ? 'var(--surface-dropdown-hover)' : 'transparent'
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { NavDropdown });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavDropdown.jsx", error: String((e && e.message) || e) }); }

// components/navigation/PortalHeader.jsx
try { (() => {
function PortalHeader({
  logoSrc,
  nav = [],
  activeIndex = 0,
  phone = '8 7172 799 599',
  email = 'support@hrqyzmet.kz',
  lang = 'Рус',
  searchPlaceholder = 'Введите название вакансии или компании',
  onNavigate,
  onLogin,
  onRegister,
  onSearch,
  loginLabel = 'Войти',
  registerLabel = 'Регистрация'
}) {
  const f = {
    fontFamily: 'var(--font-portal)',
    fontSize: 15,
    textDecoration: 'none'
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-portal-bar)',
      height: 'var(--portal-topbar-h)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-portal)',
      margin: '0 auto',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 43
    }
  }, nav.map((n, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate(i);
    },
    style: {
      ...f,
      color: i === activeIndex ? 'var(--sk-gold-300)' : 'var(--sk-white)',
      textTransform: i === activeIndex ? 'uppercase' : 'none',
      fontWeight: i === activeIndex ? 500 : 400
    }
  }, n)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...f,
      color: 'var(--sk-white)'
    }
  }, phone), /*#__PURE__*/React.createElement("span", {
    style: {
      ...f,
      color: 'var(--sk-white)'
    }
  }, email))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sk-white)',
      height: 'var(--portal-header-h)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-portal)',
      margin: '0 auto',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 30
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "QSAMRUK.KZ",
    style: {
      height: 62
    }
  }) : /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: 'var(--font-portal)',
      fontSize: 28,
      color: 'var(--sk-navy-900)'
    }
  }, "QSAMRUK.KZ"), /*#__PURE__*/React.createElement(__ds_scope.SearchInput, {
    placeholder: searchPlaceholder,
    onSubmit: onSearch,
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.LangSelect, {
    variant: "portal",
    value: lang
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onClick: onLogin,
    style: {
      padding: '0 36px'
    }
  }, loginLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "gold",
    onClick: onRegister
  }, registerLabel))));
}
Object.assign(__ds_scope, { PortalHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/PortalHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function SiteFooter({
  copyright = '© 2009-2026 "Samruk-Kazyna" JSC',
  socials = ['facebook', 'youtube', 'instagram', 'telegram'],
  links = {}
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-footer)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-corporate)',
      margin: '0 auto',
      minHeight: 78,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
      padding: '16px 0',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-corporate)',
      fontSize: 16,
      color: 'var(--text-inverse)'
    }
  }, copyright), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, socials.map(s => /*#__PURE__*/React.createElement(__ds_scope.SocialIcon, {
    key: s,
    network: s,
    href: links[s] || '#',
    size: 38
  })))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
function SiteHeader({
  logoSrc,
  sknewsSrc,
  items = [],
  activeIndex = -1,
  lang = 'Eng',
  onLangChange,
  onNavigate,
  onSearch
}) {
  const [open, setOpen] = React.useState(-1);
  const [hov, setHov] = React.useState(-1);
  const cell = {
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'relative',
      zIndex: 30,
      height: 'var(--header-h)',
      background: 'var(--surface-header)',
      display: 'flex',
      alignItems: 'stretch',
      maxWidth: 'var(--container-corporate)',
      margin: '0 auto',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      ...cell,
      padding: '0 12px',
      flex: 'none'
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Samruk-Kazyna",
    style: {
      height: 50
    }
  }) : /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: 'var(--font-corporate)',
      color: 'var(--sk-gold-500)'
    }
  }, "SAMRUK-KAZYNA")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      marginLeft: 'auto'
    },
    onMouseLeave: () => setOpen(-1)
  }, items.map((it, i) => {
    const on = i === open || i === activeIndex || i === hov;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'relative'
      },
      onMouseEnter: () => {
        setHov(i);
        it.children && setOpen(i);
      },
      onMouseLeave: () => setHov(-1)
    }, /*#__PURE__*/React.createElement("a", {
      href: it.href || '#',
      onClick: e => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate(i, it);
        }
      },
      style: {
        ...cell,
        padding: '0 17px',
        fontFamily: 'var(--font-corporate)',
        fontSize: 16,
        color: on ? 'var(--sk-white)' : 'var(--sk-ink)',
        background: on ? 'var(--accent-tan)' : 'transparent',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transition: 'background var(--dur-fast)'
      }
    }, it.label), open === i && it.children && /*#__PURE__*/React.createElement(__ds_scope.NavDropdown, {
      items: it.children,
      style: {
        position: 'absolute',
        top: '100%',
        left: 0
      },
      onSelect: (j, c) => {
        setOpen(-1);
        onNavigate && onNavigate(i, c);
      }
    }));
  })), sknewsSrc && /*#__PURE__*/React.createElement("a", {
    href: "https://sknews.kz",
    style: {
      ...cell,
      padding: '0 14px 0 12px',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: sknewsSrc,
    alt: "SK NEWS",
    style: {
      height: 24
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...cell,
      padding: '0 22px',
      borderLeft: '1px solid var(--sk-grey-150)',
      borderRight: '1px solid var(--sk-grey-150)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.LangSelect, {
    value: lang,
    onChange: onLangChange
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Search",
    onClick: onSearch,
    style: {
      width: 66,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 28,
    color: "var(--sk-gold-500)"
  })));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/qsamruk/PortalHero.jsx
try { (() => {
function QHero({
  onSearch
}) {
  const {
    StatCounter,
    TextField,
    SelectField,
    Button
  } = window.QDS;
  const [q, setQ] = React.useState('');
  const [r, setR] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 515,
      background: 'var(--overlay-hero), url(../../assets/photos/qsamruk-hero.png) center/cover',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 40,
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '60px 0 0',
      fontFamily: 'var(--font-portal)',
      fontWeight: 500,
      fontSize: 'var(--fs-portal-hero)',
      color: '#fff',
      textShadow: '0 1px 6px rgba(0,0,0,.3)'
    }
  }, "\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u0438 \u0432 \u043B\u0443\u0447\u0448\u0438\u0445 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F\u0445 \u0441\u0442\u0440\u0430\u043D\u044B"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 170,
      marginTop: 60
    }
  }, /*#__PURE__*/React.createElement(StatCounter, {
    label: "\u0421\u043E\u0438\u0441\u043A\u0430\u0442\u0435\u043B\u0435\u0439",
    value: "355 708"
  }), /*#__PURE__*/React.createElement(StatCounter, {
    label: "\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u0439",
    value: "990"
  }), /*#__PURE__*/React.createElement(StatCounter, {
    label: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0439 \u0438 \u0444\u0438\u043B\u0438\u0430\u043B\u043E\u0432",
    value: "451"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-portal)',
      margin: '-60px auto 0',
      position: 'relative',
      background: '#fff',
      boxShadow: 'var(--shadow-panel)',
      padding: '24px 24px 40px',
      display: 'grid',
      gridTemplateColumns: '185px 265px 265px 1fr',
      gap: 30,
      alignItems: 'end',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "\u042F \u0438\u0449\u0443",
    value: q,
    onChange: setQ
  }), /*#__PURE__*/React.createElement(SelectField, {
    label: "\u041F\u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044E",
    placeholder: "",
    options: Q_DIRS
  }), /*#__PURE__*/React.createElement(SelectField, {
    label: "\u0412 \u0440\u0435\u0433\u0438\u043E\u043D\u0435",
    placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434 \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430...",
    options: Q_REGIONS,
    value: r,
    onChange: setR
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Button, {
    style: {
      flex: 1,
      height: 44,
      padding: 0
    },
    onClick: () => onSearch(q, r)
  }, "\u041D\u0430\u0439\u0442\u0438"), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    style: {
      flex: 1.7,
      height: 44,
      padding: 0
    }
  }, "\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0439 \u043F\u043E\u0438\u0441\u043A"))));
}
window.QHero = QHero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/qsamruk/PortalHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/qsamruk/PortalSections.jsx
try { (() => {
function QWinners() {
  const {
    SectionTitle,
    NominationCard
  } = window.QDS;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1240,
      margin: '60px auto 0',
      background: '#fff',
      boxShadow: 'var(--shadow-panel)',
      padding: '36px 46px 50px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "\u041F\u043E\u0431\u0435\u0434\u0438\u0442\u0435\u043B\u0438 \u043A\u043E\u043D\u043A\u0443\u0440\u0441\u0430 HR-\u0431\u0440\u0435\u043D\u0434 2025"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,minmax(0,1fr))',
      gap: 10,
      marginTop: 24
    }
  }, Q_WINNERS.map(([l, n]) => /*#__PURE__*/React.createElement(NominationCard, {
    key: l,
    logo: '../../assets/logos/winner-' + l + '.png',
    nomination: n
  }))));
}
function QCompanies() {
  const {
    SectionTitle,
    LogoTile,
    ArrowLink
  } = window.QDS;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-portal)',
      margin: '56px auto 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    align: "left",
    underline: false
  }, "\u041A\u0430\u0440\u044C\u0435\u0440\u043D\u044B\u0435 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0432 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F\u0445"), /*#__PURE__*/React.createElement(ArrowLink, {
    color: "var(--sk-gold-500)",
    style: {
      fontFamily: 'var(--font-portal)',
      fontSize: 15
    }
  }, "\u0412\u0441\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      marginTop: 50
    }
  }, Q_COMPANIES.map(c => /*#__PURE__*/React.createElement(LogoTile, {
    key: c,
    src: '../../assets/logos/co-' + c + '.png',
    height: 190
  }))));
}
function QCookie({
  onOk
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(23,51,93,.78)',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '10px 16px',
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onOk,
    style: {
      background: 'var(--sk-gold-500)',
      color: '#fff',
      border: 'none',
      padding: '6px 10px',
      fontFamily: 'var(--font-portal)',
      cursor: 'pointer'
    }
  }, "Ok"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-portal)',
      fontSize: 14,
      lineHeight: '20px',
      color: '#fff'
    }
  }, "\u0414\u0430\u043D\u043D\u044B\u0439 \u0441\u0430\u0439\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u0444\u0430\u0439\u043B\u044B cookie, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u043E\u043C\u043E\u0433\u0430\u044E\u0442 \u0435\u0433\u043E \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044E \u0438 \u043F\u043E\u043C\u043E\u0433\u0430\u044E\u0442 \u043D\u0430\u043C \u043F\u043E\u043D\u044F\u0442\u044C, \u043A\u0430\u043A \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0442 \u0441 \u043D\u0438\u043C. \u0415\u0441\u043B\u0438 \u0412\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u0442\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0441\u0430\u0439\u0442\u043E\u043C, \u043C\u044B \u043F\u0440\u0435\u0434\u043F\u043E\u043B\u0430\u0433\u0430\u0435\u043C, \u0447\u0442\u043E \u0412\u044B \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u044B \u0441 \u044D\u0442\u0438\u043C."));
}
function QResults({
  q,
  r,
  onBack
}) {
  const {
    Button
  } = window.QDS;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-portal)',
      margin: '50px auto 80px',
      fontFamily: 'var(--font-portal)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--sk-grey-700)'
    }
  }, "\u041F\u043E\u0438\u0441\u043A: \xAB", q || 'все вакансии', "\xBB", r ? ' · ' + r : ''), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--sk-grey-500)'
    }
  }, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430 \u043D\u0435 \u0432\u0445\u043E\u0434\u044F\u0442 \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u2014 \u044D\u043A\u0440\u0430\u043D \u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D \u043F\u0443\u0441\u0442\u044B\u043C \u043D\u0430\u043C\u0435\u0440\u0435\u043D\u043D\u043E."), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: onBack
  }, "\u041D\u0430\u0437\u0430\u0434"));
}
Object.assign(window, {
  QWinners,
  QCompanies,
  QCookie,
  QResults
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/qsamruk/PortalSections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/qsamruk/data.jsx
try { (() => {
const Q_NAV = ['Главная', 'Вакансии', 'Компании', 'Мероприятия', 'Блог о карьере', 'ГИД QSamruk'];
const Q_WINNERS = [['ktzh', 'Мастер подбора персонала'], ['samruk-energy', 'Архитектор талантов'], ['kazatomprom', 'HR-прорыв года'], ['qazpost', 'Драйвер вовлеченности'], ['kegoc', 'Лидер HR-цифровизации']];
const Q_COMPANIES = ['samruk-kazyna', 'eon-energo', 'nrg-audit', 'kazmunaygas', 'kazatomprom', 'ktzh', 'qazpost', 'kazakhtelecom', 'qazaqgaz', 'samruk-energy'];
const Q_REGIONS = ['Астана', 'Алматы', 'Шымкент', 'Атырау', 'Актау', 'Караганда', 'Павлодар', 'Усть-Каменогорск'];
const Q_DIRS = ['IT и цифровизация', 'Финансы', 'Инженерия', 'Производство', 'HR', 'Юриспруденция', 'Логистика'];
Object.assign(window, {
  Q_NAV,
  Q_WINNERS,
  Q_COMPANIES,
  Q_REGIONS,
  Q_DIRS,
  QDS: window.SamrukKazynaDesignSystem_ebccd6
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/qsamruk/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/qsamruk/main.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function QApp() {
  const {
    PortalHeader
  } = window.QDS;
  const [nav, setNav] = React.useState(1);
  const [cookie, setCookie] = React.useState(true);
  const [search, setSearch] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PortalHeader, {
    logoSrc: "../../assets/logos/qsamruk-logo.png",
    nav: Q_NAV,
    activeIndex: nav,
    onNavigate: setNav,
    onSearch: q => setSearch({
      q,
      r: ''
    })
  }), /*#__PURE__*/React.createElement(QHero, {
    onSearch: (q, r) => setSearch({
      q,
      r
    })
  }), search ? /*#__PURE__*/React.createElement(QResults, _extends({}, search, {
    onBack: () => setSearch(null)
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(QWinners, null), /*#__PURE__*/React.createElement(QCompanies, null)), cookie && /*#__PURE__*/React.createElement(QCookie, {
    onOk: () => setCookie(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(QApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/qsamruk/main.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sk-kz/HomeHero.jsx
try { (() => {
function SkHomeHero() {
  const {
    SiteHeader,
    HeroSlide,
    DateTabs
  } = window.SKDS;
  const [i, setI] = React.useState(1);
  const n = SK_SLIDES.length;
  const s = SK_SLIDES[i];
  React.useEffect(() => {
    const t = setTimeout(() => setI((i + 1) % n), 7000);
    return () => clearTimeout(t);
  }, [i]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sk-pattern",
    style: {
      paddingBottom: 0
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    logoSrc: "../../assets/logo-navy.svg",
    sknewsSrc: "../../assets/logos/sknews-wordmark.png",
    items: SK_NAV
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-corporate)',
      margin: '30px auto 0'
    }
  }, /*#__PURE__*/React.createElement(HeroSlide, {
    key: i,
    title: s.title,
    excerpt: s.excerpt,
    image: s.image,
    onPrev: () => setI((i - 1 + n) % n),
    onNext: () => setI((i + 1) % n)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-corporate)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(DateTabs, {
    items: SK_SLIDES.map(x => x.date),
    active: i,
    onChange: setI
  })));
}
window.SkHomeHero = SkHomeHero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sk-kz/HomeHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sk-kz/HomeSections.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SkWrap({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-corporate)',
      margin: '0 auto',
      ...style
    }
  }, children);
}
function SkEventFeed() {
  const {
    SectionDivider,
    NewsCard,
    ArrowLink
  } = window.SKDS;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '38px 0 0'
    }
  }, /*#__PURE__*/React.createElement(SectionDivider, {
    title: "Event feed"
  }), /*#__PURE__*/React.createElement(SkWrap, {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 26,
      marginTop: 60
    }
  }, SK_FEED.map((f, i) => /*#__PURE__*/React.createElement(NewsCard, _extends({
    key: i
  }, f)))), /*#__PURE__*/React.createElement(SkWrap, {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement(ArrowLink, null, "All news")));
}
function SkAbout() {
  const {
    SectionDivider,
    ArrowLink
  } = window.SKDS;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '70px 0 0'
    }
  }, /*#__PURE__*/React.createElement(SectionDivider, {
    title: "About the Fund"
  }), /*#__PURE__*/React.createElement(SkWrap, {
    style: {
      display: 'grid',
      gridTemplateColumns: '340px 1fr',
      gap: 60,
      alignItems: 'center',
      marginTop: 50,
      background: 'var(--sk-white)',
      padding: '50px 60px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-navy.svg",
    alt: "",
    style: {
      width: '100%'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-corporate)',
      fontSize: 18,
      lineHeight: '28px',
      color: 'var(--text-heading)'
    }
  }, "Joint Stock Company Samruk-Kazyna was founded in 2008 by Decree of the President of the Republic of Kazakhstan. The sole shareholder of the Fund is the Government of the Republic of Kazakhstan."), /*#__PURE__*/React.createElement(ArrowLink, {
    style: {
      marginTop: 24
    }
  }, "See more"))));
}
function SkPortfolio() {
  const {
    SectionDivider,
    DotPager,
    CompanyPicker,
    LogoTile
  } = window.SKDS;
  const [p, setP] = React.useState(1);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '70px 0 0'
    }
  }, /*#__PURE__*/React.createElement(SectionDivider, {
    title: "Portfolio companies"
  }), /*#__PURE__*/React.createElement(SkWrap, {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      marginTop: 40,
      background: 'var(--sk-white)'
    }
  }, SK_COMPANIES.slice(p % 4, p % 4 + 4).map(c => /*#__PURE__*/React.createElement(LogoTile, {
    key: c,
    src: '../../assets/logos/co-' + c + '.png',
    height: 170
  }))), /*#__PURE__*/React.createElement(SkWrap, {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 30,
      padding: '0 90px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(DotPager, {
    count: 6,
    active: p,
    onChange: setP
  }), /*#__PURE__*/React.createElement(CompanyPicker, null)));
}
function SkHotline() {
  const {
    SectionDivider,
    InfoCard
  } = window.SKDS;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '90px 0 0'
    }
  }, /*#__PURE__*/React.createElement(SectionDivider, null), /*#__PURE__*/React.createElement(SkWrap, {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 28,
      marginTop: 60
    }
  }, /*#__PURE__*/React.createElement(InfoCard, {
    title: "Hotline",
    image: "../../assets/photos/hotline.png"
  }, "You can report any violations of the Code of Conduct, including corruption, discrimination, unethical behavior and other violations."), /*#__PURE__*/React.createElement(InfoCard, {
    title: "We guarantee",
    image: "../../assets/photos/guarantee.png"
  }, /*#__PURE__*/React.createElement("span", null, "Confidentiality and anonymity"), /*#__PURE__*/React.createElement("span", null, "Consideration of 100% of appeals")), /*#__PURE__*/React.createElement(InfoCard, {
    title: "Hotline"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 36
    }
  }, "Phone: 8-800-080-47-47"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 24
    }
  }, "WhatsApp: 8-771-191-88-16"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 24
    }
  }, "Site: www.sk-hotline.kz"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 24
    }
  }, "Email: mail@sk-hotline.kz"))));
}
function SkPartners() {
  const {
    Icon
  } = window.SKDS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-band)',
      padding: '60px 0'
    }
  }, /*#__PURE__*/React.createElement(SkWrap, {
    style: {
      background: 'var(--sk-white)',
      height: 100,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '0 18px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 22,
    color: "var(--sk-blue-600)"
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/partners-strip.png",
    alt: "AIFC, PrimeMinister.kz, Akorda.kz, Elbasy.kz, SK News",
    style: {
      flex: 1,
      minWidth: 0,
      height: 76,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 22,
    color: "var(--sk-blue-600)"
  })));
}
Object.assign(window, {
  SkEventFeed,
  SkAbout,
  SkPortfolio,
  SkHotline,
  SkPartners
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sk-kz/HomeSections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sk-kz/Loader.jsx
try { (() => {
function SkLoader({
  progress
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--surface-page)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 290
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-navy.svg",
    alt: "Samruk-Kazyna",
    style: {
      width: '100%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 2,
      background: 'var(--sk-grey-300)',
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 2,
      width: progress + '%',
      background: 'var(--sk-navy-800)',
      transition: 'width .2s linear'
    }
  }))));
}
window.SkLoader = SkLoader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sk-kz/Loader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sk-kz/data.jsx
try { (() => {
const SK_NAV = [{
  label: 'About SK',
  children: ['Corporate Governance', 'Board of Directors', 'Committees of the Board of Directors', 'Management Board', 'Organizational Structure', 'Compliance', 'Legal Framework', 'Ratings', 'Financial Performance', 'Sustainable Development', 'Occupational Safety', 'Kazakh-Chinese Business Council', 'Fund reforms', 'Social responsibility', 'Contacts'].map(l => ({
    label: l
  }))
}, {
  label: 'For investors',
  children: ['- Annual report', '- Sustainability report', '- OHS Policy', 'Major investment projects of Samuryk-Kazyna JSC', 'Low-Carbon Development Concept of Samruk-Kazyna JSC'].map(l => ({
    label: l
  }))
}, {
  label: 'Companies'
}, {
  label: 'Press Center',
  children: ['Press releases', 'Photogallery', 'Briefing'].map(l => ({
    label: l
  }))
}, {
  label: 'Career'
}, {
  label: 'Procurements'
}, {
  label: 'Charity'
}];
const SK_SLIDES = [{
  date: '23 September',
  title: 'HackAlem AI: Participants to Create More Than 1,500 AI Agents in Five Hours',
  excerpt: 'HackAlem AI, the world’s largest hackathon focused on developing AI agents, is taking plac...',
  image: '../../assets/photos/news-meeting.png'
}, {
  date: '23 September',
  title: 'Samruk-Kazyna-funded school in earthquake-hit Turkish province welcomes first students',
  excerpt: 'On September 14, the Khoja Ahmed Yasawi School in the Nurdağı district of Gaziantep Provin...',
  image: '../../assets/photos/news-school.png'
}, {
  date: '16 September',
  title: 'Samruk-Kazyna Group has signed a number of agreements with Korean partners worth approximately $11 billion',
  excerpt: 'At the meeting between the Head of State and Hyundai, QazaqGaz JSC and Hyundai Engineering...',
  image: '../../assets/photos/news-school.png'
}, {
  date: '11 September',
  title: 'Samruk-Kazyna Maintains Growth in Key Financial and Operational Indicators',
  excerpt: 'A meeting of the Public Council of Samruk-Kazyna JSC dedicated to the Fund’s financial res...',
  image: '../../assets/photos/news-meeting.png'
}];
const SK_FEED = [{
  title: 'HackAlem AI: Participants to Create More Than 1,500 AI Agents in Five Hours',
  date: '23.09.2026',
  views: 8
}, {
  title: 'Nurlan Zhakupov Meets with Chairman of Sunwah Group',
  date: '23.09.2026',
  views: 22
}, {
  title: 'How AI Is Transforming the Oil and Gas Industry',
  date: '18.09.2026',
  views: 139
}, {
  title: 'Samruk-Kazyna-funded school in earthquake-hit Turkish province welcomes first students',
  date: '16.09.2026',
  views: 155
}];
const SK_COMPANIES = ['kazmunaygas', 'kazatomprom', 'ktzh', 'samruk-energy', 'qazpost', 'kazakhtelecom', 'qazaqgaz'];
Object.assign(window, {
  SK_NAV,
  SK_SLIDES,
  SK_FEED,
  SK_COMPANIES,
  SKDS: window.SamrukKazynaDesignSystem_ebccd6
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sk-kz/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sk-kz/main.jsx
try { (() => {
function SkApp() {
  const {
    SiteFooter
  } = window.SKDS;
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    if (p >= 100) return;
    const t = setTimeout(() => setP(p + 20), 160);
    return () => clearTimeout(t);
  }, [p]);
  return /*#__PURE__*/React.createElement("div", null, p < 100 && /*#__PURE__*/React.createElement(SkLoader, {
    progress: p
  }), /*#__PURE__*/React.createElement(SkHomeHero, null), /*#__PURE__*/React.createElement(SkEventFeed, null), /*#__PURE__*/React.createElement(SkAbout, null), /*#__PURE__*/React.createElement(SkPortfolio, null), /*#__PURE__*/React.createElement(SkHotline, null), /*#__PURE__*/React.createElement(SkPartners, null), /*#__PURE__*/React.createElement(SiteFooter, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(SkApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sk-kz/main.jsx", error: String((e && e.message) || e) }); }

__ds_ns.DateTabs = __ds_scope.DateTabs;

__ds_ns.DotPager = __ds_scope.DotPager;

__ds_ns.HeroSlide = __ds_scope.HeroSlide;

__ds_ns.InfoCard = __ds_scope.InfoCard;

__ds_ns.LogoTile = __ds_scope.LogoTile;

__ds_ns.NewsCard = __ds_scope.NewsCard;

__ds_ns.NominationCard = __ds_scope.NominationCard;

__ds_ns.SectionDivider = __ds_scope.SectionDivider;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

__ds_ns.StatCounter = __ds_scope.StatCounter;

__ds_ns.ArrowLink = __ds_scope.ArrowLink;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.SocialIcon = __ds_scope.SocialIcon;

__ds_ns.CompanyPicker = __ds_scope.CompanyPicker;

__ds_ns.SearchInput = __ds_scope.SearchInput;

__ds_ns.SelectField = __ds_scope.SelectField;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.LangSelect = __ds_scope.LangSelect;

__ds_ns.NavDropdown = __ds_scope.NavDropdown;

__ds_ns.PortalHeader = __ds_scope.PortalHeader;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
