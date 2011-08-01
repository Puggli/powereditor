/**
* Copyright (c) 2011, Facebook, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*   * Redistributions of source code must retain the above copyright notice,
*     this list of conditions and the following disclaimer.
*   * Redistributions in binary form must reproduce the above copyright notice,
*     this list of conditions and the following disclaimer in the documentation
*     and/or other materials provided with the distribution.
*   * Neither the name Facebook nor the names of its contributors may be used to
*     endorse or promote products derived from this software without specific
*     prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*
*
*/
requireCss("./progressBar/progressBar.css");


var fun   = require("../../uki-core/function"),
    dom   = require("../../uki-core/dom"),
    view  = require("../../uki-core/view"),

    Base = require("../../uki-core/view/base").Base;

var ProgressBar = view.newClass('fb.ProgressBar', Base, {
  _createDom: function() {
    this._fill = dom.createElement(
      'div', {className: 'ufb-progress-bar-fill'});
    this._dom = dom.createElement('div',
      { className: 'ufb-progress-bar ufb-progress-bar_large' },
      [this._fill]);
  },

  size: view.newClassMapProp({
   large: 'ufb-progress-bar_large',
   small: 'ufb-progress-bar_small'
  }),

  _min: 0,
  _max: 100,
  _value: 0,

  _redraw: function() {
    var v = Math.max(this.min(), Math.min(this.max(), this.value()));
    dom.toggleClass(
      this._fill,
      'ufb-progress-bar-fill_empty',
      v == this.min());
    dom.toggleClass(
      this._fill,
      'ufb-progress-bar-fill_full',
      v == this.max());
    this._fill.style.width = v / (this.max() - this.min()) * 100 + '%';
  }
});

fun.addProp(ProgressBar.prototype, 'max', function(v) {
  this._max = v;
  this._redraw();
});

fun.addProp(ProgressBar.prototype, 'min', function(v) {
  this._min = v;
  this._redraw();
});

fun.addProp(ProgressBar.prototype, 'value', function(v) {
  this._value = v;
  this._redraw();
});


exports.ProgressBar = ProgressBar;