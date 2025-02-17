# React-drag-and-drop :blush:

Homepage: https://github.com/Gurjinder7/react-drag-and-drop#readme  :wave:

  ** ***<u>made with and for React 18</u>*** ** :smile:

### How to install
```npm i @gurjinder7/react-drag-and-drop```

### How to use in your React project

1. Import into the project (where ever you need the feature)
   1. ```import DragAndDrop from '@gurjinder7/react-drag-and-drop'```
2. Format for use in JSX
   ```
   <DragAndDrop 
    setFileData={<your_file_receiving_function>}
    id="<some_id>"
    ref={<ref_for_this_element>}
    >
   ```
3. The component will start working for the intended functionality
   1. This will take any file format and size.
   2. **NOTE**: <u>***Adding "id" and "refs" is important to avoid glitches***.</u> :worried:

### Parameters:
Following are some important information about the parameters, also informs about how you can add restrictions for some use cases.
* **Required**: :point_left:
  * ```setFileData``` - to receive the file object from this component, use event object in the receving function for the file data.
  * ```id``` - to uniquely identify the component in DOM 
  * ```ref``` - to receive ref for the component
* **Optional** :v:
  * ```style``` - you can add your own css classes to overwrite the styling
  * ```size``` - mention a number to limit the file size (in MBs)
    * example: if your write 1, that means size limit of 1 MB.
  * ```accept```- mention one of the following to limit the file type
    * ```image``` - only allows images of extensions - ```.jpeg, .jpg, .png```
    * ```pdf``` - allows ```.pdf``` format only
    * ```doc``` - allows ```.docx, .doc``` formats
    * ```csv``` - allows ```.csv``` format only
    * ```excel``` - allows ```.xlsx, .odt``` formats

### Example with optional parameters:

    let fileRef = createRef()

    let fileId = uuid() or "file123

    const getFileDataFromDragAndDrop = (e) => {
        console.log(e)
    }

    <DragAndDrop 
     setFileData={getFileDataFromDragAndDrop}
     id="file123"
     ref={fileRef}
     style="bg-red bg-border"
     size="1"
     accept="image"
    >

##### <u>Important Note:</u> :imp:
***Different id and refs is important for multiple instances:*** if you are using more than one instance of the component, otherwise you will experience glitch of file being attached to first instance every time you try to add a file to  any other instance of the component.

#### Report an issues! :cry:
* Please raise an issue on the package repo at: https://github.com/Gurjinder7/react-drag-and-drop/issues