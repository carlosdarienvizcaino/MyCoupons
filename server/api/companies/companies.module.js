/**
 * Created by Carlos on 3/2/2017.
 */

module.exports = Companies;

function Companies() {
  this.map = new Map();
}

Companies.prototype.addCompany = function(companyName, object) {
 this.map.set(companyName, object);
};

Companies.prototype.hasCompany = function(companyName) {
  return this.map.has(companyName);
};

Companies.prototype.getCompany = function(companyName) {
  return this.map.get(companyName);
};

Companies.prototype.getAllCompanies = function() {
  var companyList = createCompaniesListFromCompaniesMap(this.map);
  return sortCompaniesByDomainInAscendingOrder(companyList);
};

function createCompaniesListFromCompaniesMap(companiesMap) {
  return Array.from(companiesMap.values());
};

function sortCompaniesByDomainInAscendingOrder(companies) {
  companies.sort(function (a, b) {

  // Sort a to a lower index than b
    if (a.domain < b.domain)
      return -1;

      // Sort b to a lower index than a
      if (a.domain > b.domain)
        return 1;

      return 0;
    });

  return companies;
};


