'use babel';

import AtomHypertermView from './atom-hyperterm-view';
import { CompositeDisposable } from 'atom';

export default {

  atomHypertermView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomHypertermView = new AtomHypertermView(state.atomHypertermViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomHypertermView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-hyperterm:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomHypertermView.destroy();
  },

  serialize() {
    return {
      atomHypertermViewState: this.atomHypertermView.serialize()
    };
  },

  toggle() {
    console.log('AtomHyperterm was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
