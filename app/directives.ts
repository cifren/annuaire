export function autocompleteUserAndGroup (globals) {
  //let globals={ wsgroupsURL:'https://wsgroups.univparis1.fr'};
  //var searchUserURL = globals.wsgroupsURL + '/searchUserCAS';
  var searchURL = globals.wsgroupsURL + '/search';


  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope : any, el, attr, ngModel : ng.INgModelController) {
	  var select = function (event, ui) {
	    // NB: this event is called before the selected value is set in the "input"

	    ui.item.id = ui.item.value;
	    ui.item.name = ui.item.label;
      // afficher prénom et nom de la personne sélectionnée sur le input
	    jQuery(el).val(ui.item.label);
      //Mettre a jour la valeur de ngModel par la valeur saisie
      scope.$apply(function () {
          ngModel.$setViewValue(ui.item);
      });
      //Ajouter un attribut onSelect, qui sera utilisé pour initialier le token ( voir onselect de index.html )
	    scope.$apply(attr['onSelect']);
      //scope.$apply(attr['onBlur']);
	    return false;
  };

  let onSearchSuccess = function (data) {
    scope.$parent.main.searchResults = data;
    return data;
  };

  //onSearchSuccess renvoie une liste des groups et/ou users
  var params = { select: select, onSearchSuccess,wsParams: { filter_category: "structures", group_attrs: "businessCategory", CAS: !!location.href.match(/connected/) } };
  // autocompleteUser de jQuery gère l'autocomplétion
  jQuery(el)['autocompleteUserAndGroup'](searchURL, params);
}
};
}

export function showFocus($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  }
}

export function focusOut($timeout) {		
  return function(scope, elem, attr) {		
    scope.$on('focusOut', function(e, name) {		
        if (name === attr.focusOut) {		
            $timeout(function () {		
                console.log("blur", elem[0]);		
                return elem[0].blur();		
            });		
      }		
    });		
  };		
}