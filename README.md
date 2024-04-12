# 724 Events

## Description
L'application est le site d'une agence evenementielle.
## Pre-requis
- NodeJS  >= v16.14.1

## Installation
- `yarn install`

## Lancement de l'application
- `yarn start`

## Tests
- `yarn test`



//////////////

# Fixes


Undefined slide : Fixed
Correction applied : Array indices are zero-based, so the condition should be index < byDateDesc.length - 1, and not index < byDateDesc.length

Broken radio buttons : fixed
Correction applied : 
- The condition should be index === radioIdx, and not idx === radioIdx, because idx is the index of the map function, and not the index of the current event
- The radio button were rendered by a map in a map, which duplicated them and caused the issue. I took the map of the radio button out of the map of the events
- The radio buttons are passed on readOnly

Missing dates : Fixed
Correction applied : The getMonth method on the Date object returned a zero-based month number, but the MONTHS object was using one-based keys. So, to fix this, I changed the keys in the MONTHS object to be zero-based.

Category filter not working : Fixed
Correction applied : 
- Added the props "newValue" to "onChange" in the Select component
- In the component Events, the filter function only filtered the events by index, and not by the event type. I added the event.type === type condition to filter the events by type

Card in footer : Fixed
Correction applied :
- In the contextProvider, I added a "last" state, and sorted the data by date to get the last event.
- In Home, on component EventCard, I added a condition to display the last event only if it exists, to avoid an error when the data is not yet loaded 



Miscalenious : 
- fixed syntax in logo "font-size" vs "fontSize" etc.
- Not asked in the task, but I added a "cursor:pointer" to the css list items of the Select component for UX improvement.
- in EventCard, temporary fix to avoid the test failure, but I must investigate why the imageSrc and title are not provided in some cases
- Added ids to sections for the navbar buttons anchor to work