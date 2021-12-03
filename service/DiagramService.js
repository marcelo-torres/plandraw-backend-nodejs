
exports.updateProperty = (diagram, elementBusinessId, property) => {
    var propertyUpdated = false;

    if(diagram && diagram.elements) {
      for(const element of diagram.elements) {
        if(element.data && element.data.businessObject) {
          var businessObject = element.data.businessObject;
          if(businessObject.id === elementBusinessId) {
            if(businessObject.properties) {
              for (var i = 0; i < businessObject.properties.length; i++) {
                if(businessObject.properties[i].name === property.name) {
                  businessObject.properties[i] = property;
                  propertyUpdated = true;
                  break;
                }
              }
              if(!propertyUpdated) {
                businessObject.properties.push(property);
                propertyUpdated = true;
              }

              console.log(businessObject.properties);
            }
          }
        }
      }
    }

    return propertyUpdated;
}

exports.getServicesFromDiagram = function(diagram) {
  if(!diagram) return [];

  var services = [];
  for(const element of diagram.elements) {
    if(element.data && element.data.businessObject) {
      services.push(element.data.businessObject);
    }
  }

  return services;
}