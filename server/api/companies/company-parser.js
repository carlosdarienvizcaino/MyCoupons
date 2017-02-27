/**
 * Created by Carlos on 2/26/2017.
 */

/**
 * @param {String} companyNameAndEmailStr
 * @return {String}
 */
export function parseCompanyName(companyNameAndEmailStr) {

  var strArray = removeEmailFromString(companyNameAndEmailStr);

  var companyName = strArray[0];
  for (var i = 1; i < strArray.length; i++) {
    companyName += ' ' + strArray[i];
  }

  return companyName;
}

/**
 * @param {String} companyNameAndEmailStr
 * @return {String}
 */
export function parseCompanyDomain(companyNameAndEmailStr) {
  var str = companyNameAndEmailStr.replace('>', '');
  str = str.replace('@', '.');

  var dotDelimiter = '.';
  var strArray = str.split(dotDelimiter);

  return strArray[strArray.length-2] + '.' + strArray[strArray.length-1];
}

function removeEmailFromString(companyNameAndEmailStr) {
  var spaceDelimiter = ' ';
  var strArray = companyNameAndEmailStr.split(spaceDelimiter);
  strArray.splice(strArray.length-1, 1);
  return strArray;
}

