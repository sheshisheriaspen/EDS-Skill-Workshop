import React from 'react'
import ReactDOM from 'react-dom/client'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import App from './App.jsx'
import './index.css'

// Aspentech Design System imports
import '@aspentech/pf-ui-core/main.css';

import { setBasePath } from "@shoelace-style/shoelace";
import { registerIconLibrary } from "@shoelace-style/shoelace/dist/utilities/icon-library.js";

// Register only the Aspentech components used by this app to keep bundles smaller.
import "@aspentech/pf-ui-compound/components/eds-appbar";
import "@aspentech/pf-ui-compound/components/eds-page-header";
import "@aspentech/pf-ui-compound/components/eds-page-info";
import "@aspentech/pf-ui-compound/components/eds-application-layout";
import "@aspentech/pf-ui-compound/components/eds-button-card";
import "@aspentech/pf-ui-compound/components/eds-combobox";
import "@aspentech/pf-ui-compound/components/eds-selectable-card";
import "@aspentech/pf-ui-compound/components/eds-shell-template";
import "@aspentech/pf-ui-compound/components/eds-sidenav";
import "@aspentech/pf-ui-compound/components/eds-sidenav-item";
import "@aspentech/pf-ui-compound/components/eds-slider";
import "@aspentech/pf-ui-compound/components/eds-toast"
import "@aspentech/pf-ui-assistance/components/ava-input"
import "@aspentech/pf-ui-assistance/components/ava-layout"
import "@aspentech/pf-ui-assistance/components/ava-logo"
import "@aspentech/pf-ui-assistance/components/ava-response-message"
import "@aspentech/pf-ui-assistance/components/ava-user-message"
import "@aspentech/pf-ui-assistance/components/ava-welcome-message"

import '@shoelace-style/shoelace/dist/components/tree/tree.js'
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js';
import '@shoelace-style/shoelace/dist/components/avatar/avatar.js'
import '@shoelace-style/shoelace/dist/components/badge/badge.js'
import '@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js'
import '@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/card/card.js'
import '@shoelace-style/shoelace/dist/components/divider/divider.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js'
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js'
import '@shoelace-style/shoelace/dist/components/tab/tab.js'
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js'

/* Importing the loaders */
import { defineCustomElements as defineCoreCustomElements } from '@aspentech/pf-ui-core/loader';
import { defineCustomElements as defineCompoundCustomElements } from '@aspentech/pf-ui-compound/loader';
import { defineCustomElements as defineAssistanceCustomElements } from '@aspentech/pf-ui-assistance/loader';

/* Registering the loaders */
defineCoreCustomElements();
defineCompoundCustomElements();
defineAssistanceCustomElements();

ModuleRegistry.registerModules([AllCommunityModule])

const iconRegExp = /^(.*?)(_(outlined|round|sharp|filled|two_tone))?$/;

registerIconLibrary('material', {
  resolver: (name) => {
    const match = iconRegExp.exec(name);
    if (!match) return '';
    const iconName = match[1];
    const variant = match[3] || 'outlined';

    return '/assets/sprites/material-icons-' + variant + '.svg#' + iconName;
  },
  mutator: (svg) => svg.setAttribute('fill', 'currentColor'),
  spriteSheet: true
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)