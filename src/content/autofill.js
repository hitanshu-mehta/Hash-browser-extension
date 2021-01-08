const { send } = require("process");

!(function(){

    /*
    1Password Extension

    Lovingly handcrafted by Dave Teare, Michael Fey, Rad Azzouz, and Roustem Karimov.
    Copyright (c) 2014 AgileBits. All rights reserved.

    ================================================================================

    Copyright (c) 2014 AgileBits Inc.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */

    /*
    NOTE: Many functions are removed from the original to make it simple
    */
    function collect(theDoc){

        let view = theDoc.defaultView ? theDoc.defaultView : window;

        // get the value of a dom element's attribute
        function getFormElements(theDoc, limit) {
            var els = [];
            try {
                var elsList = theDoc.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="reset"])' +
                    ':not([type="button"]):not([type="image"]):not([type="file"]), select');
                els = Array.prototype.slice.call(elsList);
            } catch (e) { }

            if (!limit || els.length <= limit) {
                return els;
            }

            // non-checkboxes/radios have higher priority
            var returnEls = [];
            var unimportantEls = [];
            for (var i = 0; i < els.length; i++) {
                if (returnEls.length >= limit) {
                    break;
                }

                var el = els[i];
                var type = el.type ? el.type.toLowerCase() : el.type;
                if (type === 'checkbox' || type === 'radio') {
                    unimportantEls.push(el);
                }
                else {
                    returnEls.push(el);
                }
            }

            var unimportantElsToAdd = limit - returnEls.length;
            if (unimportantElsToAdd > 0) {
                returnEls = returnEls.concat(unimportantEls.slice(0, unimportantElsToAdd));
            }

            return returnEls;
        }
        

        function getPageDetails(theDoc){

            function addProp(obj, prop, val, d) {
                if (0 !== d && d === val || null === val || void 0 === val) {
                    return;
                }
    
                obj[prop] = val;
            }

            // get the value of a dom element's attribute
            function getElementAttrValue(el, attrName) {
                var attrVal = el[attrName];
                if ('string' == typeof attrVal) {
                    return attrVal;
                }
                attrVal = el.getAttribute(attrName);
                return 'string' == typeof attrVal ? attrVal : null;
            }

            // query the document helper
            function queryDoc(doc, query) {
                var els = [];
                try {
                    els = doc.querySelectorAll(query);
                } catch (e) { }
                return els;
            }


             // get all the docs
            var theForms = Array.prototype.slice.call(queryDoc(theDoc, 'form')).map(function (formEl, elIndex) {
                var op = {},
                    formOpId = '__form__' + elIndex;

                formEl.opid = formOpId;
                op.opid = formOpId;
                addProp(op, 'htmlName', getElementAttrValue(formEl, 'name'));
                addProp(op, 'htmlID', getElementAttrValue(formEl, 'id'));
                formOpId = getElementAttrValue(formEl, 'action');
                formOpId = new URL(formOpId, window.location.href);
                addProp(op, 'htmlAction', formOpId ? formOpId.href : null);
                addProp(op, 'htmlMethod', getElementAttrValue(formEl, 'method'));

                return op;
            });

            var theFields = Array.prototype.slice.call(getFormElements(theDoc,50)).map(function(el,elIndex){
                // console.log(el);

                var field = {},
                opId = '__' + elIndex,
                elMaxLen = -1 == el.maxLength ? 999 : el.maxLength;

                if (!elMaxLen || 'number' === typeof elMaxLen && isNaN(elMaxLen)) {
                    elMaxLen = 999;


                el.opid = opId;
                field.opid = opId;
                field.elementNumber = elIndex;
                addProp(field,'maxlength',Math.min(elMaxLen,999),999);
                addProp(field, 'htmlID', getElementAttrValue(el, 'id'));
                addProp(field, 'htmlName', getElementAttrValue(el, 'name'));
                addProp(field, 'htmlClass', getElementAttrValue(el, 'class'));
                addProp(field, 'tabindex', getElementAttrValue(el, 'tabindex'));
                addProp(field, 'title', getElementAttrValue(el, 'title'));
                
                if ('hidden' != toLowerString(el.type)) {
                    addProp(field, 'label-tag', getLabelTag(el));
                    addProp(field, 'label-data', getElementAttrValue(el, 'data-label'));
                    addProp(field, 'label-aria', getElementAttrValue(el, 'aria-label'));
                    addProp(field, 'label-top', getLabelTop(el));
                    var labelArr = [];
                    for (var sib = el; sib && sib.nextSibling;) {
                        sib = sib.nextSibling;
                        if (isKnownTag(sib)) {
                            break;
                        }
                        checkNodeType(labelArr, sib);
                    }
                    addProp(field, 'label-right', labelArr.join(''));
                    labelArr = [];
                    shiftForLeftLabel(el, labelArr);
                    labelArr = labelArr.reverse().join('');
                    addProp(field, 'label-left', labelArr);
                    addProp(field, 'placeholder', getElementAttrValue(el, 'placeholder'));
                }

                    
                return field;
            
            }
            });
            

            let pageDetails = {
                title:theDoc.title,
                url: view.location.href,
                documentUrl: theDoc.location.href,
                tabUrl: view.location.href,
                forms:((forms)=>{
                    let formObj = {}
                    forms.forEach((f)=> formObj[f.opid]=f);
                    return formObj;
                })(theForms),
                fields: theFields,
                collectedTimestamp: new Date().getTime()
            };

            return pageDetails;
        }

        return JSON.stringify(getPageDetails(document));
        
    }

    function fill(){
        console.log('Autofill.js Fill called');
    };

    chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
        if(msg.command == 'collectPageDetails'){
            var pageDetails = collect(document); 
            var pageDetailsObj = JSON.parse(pageDetails);

            console.log('autofill.js Page details collected');
            chrome.runtime.sendMessage({
                command:'CollectPageDetailsResponse',
                tab: msg.tab,
                details: pageDetailsObj,
                sender: msg.sender
            });
            sendResponse();
            return true;
        }
        else if(msg.command == 'fillForm'){
            fill();
        }
    })


})();