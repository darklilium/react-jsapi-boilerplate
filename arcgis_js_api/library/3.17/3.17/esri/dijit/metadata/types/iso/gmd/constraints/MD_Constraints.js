// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/iso/gmd/constraints/templates/MD_Constraints.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/AbstractObject"\r\n    data-dojo-props\x3d"target:\'gmd:MD_Constraints\',minOccurs:0"\x3e\r\n      \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n      data-dojo-props\x3d"target:\'gmd:useLimitation\',minOccurs:0,maxOccurs:\'unbounded\',\r\n        label:\'${i18nIso.MD_Constraints.useLimitation}\'"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/GcoElement"\r\n        data-dojo-props\x3d"target:\'gco:CharacterString\'"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\r\n  \x3c/div\x3e\r\n  \r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/iso/gmd/constraints/MD_Constraints","dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ../../../../form/Element ../../../../form/iso/AbstractObject ../../../../form/iso/GcoElement dojo/text!./templates/MD_Constraints.html ../../../../../../kernel".split(" "),function(a,b,c,d,g,h,k,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.iso.gmd.constraints.MD_Constraints",a,f);return a});