import {column_arrangement, setDimension, createBoard, getNumberOfColumnField, checkInputField, postBoardCreation, boardRefresh, closeAsideBarMobile, clearAllInputFields, addColumn, clearCrudSection, subTaskField, closeEveryThing, countTrue} from './module.js'

document.addEventListener('DOMContentLoaded', () => {

    // if(!navigator.onLine){
    //     window.location.assign('offline.html')
    // }



    /* The code is calling two functions, `setDimension()` and `column_arrangement()`. */
    setDimension()
    column_arrangement()

    window.addEventListener('orientationchange', () => {
        window.location.reload()
    })


    /* This code adds a click event listener to an element with the class "asideVisibility". When that
    element is clicked, it adds the class "asidetoggleHidden" to the "aside" element, which will hide it
    from view. It also sets the margin-left and padding-left properties of the ".board_column" element
    to 0px, effectively moving it to the left to fill the space left by the hidden aside element. */
    document.querySelector('.asideVisibility').addEventListener('click', () => {
        document.querySelector('aside').classList.add('asidetoggleHidden')
        document.querySelector('.board_column').style.cssText =`margin-left: 0px;`
        document.querySelector('.asideRevealBtn').style.display = 'flex'
        column_arrangement()
        // saving the width of the sidebar before closing it
        document.querySelector('.asideRevealBtn').dataset.width = document.querySelector('aside').offsetWidth
        // 
        const boardColumnHeight = localStorage.getItem('KanbanBoardHeight')
        document.querySelector('.board_column').style.height = `${boardColumnHeight}px`

    })

    /* This code is adding a click event listener to an element with the class "asideReveakBtn". When that
    element is clicked, it performs the following actions: */
    const revealSideBarBtn = document.querySelector('.asideRevealBtn')
    revealSideBarBtn.addEventListener('click', () => {
    /* This code is removing the class "asidetoggleHidden" from the "aside" element, which makes it visible
    again. It also hides the element with the class "asideReveakBtn" by setting its display property to
    "none". Then, it sets the margin-left property of the element with the class "board_column" to the
    value of the dataset width of the "asideReveakBtn" element. This effectively moves the
    "board_column" element to the right, filling the space left by the hidden aside element. */
        document.querySelector('aside').classList.remove('asidetoggleHidden')
        document.querySelector('.asideRevealBtn').style.display = 'none'
        // gettin the size of the sidebar before it was closed and using the value as margin-left for board_column
        document.querySelector('.board_column').style.cssText =`margin-left: ${revealSideBarBtn.dataset.width}px`
        //
        const boardColumnHeight = localStorage.getItem('KanbanBoardHeight')
        document.querySelector('.board_column').style.height = `${boardColumnHeight}px`
    })



    // CONFIRMS IF KANBAN IS REGISTERED IN THE LOCAL STORAGE
    /* This code is checking if there is a value stored in the local storage with the key 'KANBAN'. */
    const getKanban = localStorage.getItem('KANBAN')
    if(getKanban){
        boardRefresh()
    }
    else{
        const stringKanbanDict = JSON.stringify(new Object)
        localStorage.setItem('KANBAN', stringKanbanDict)
        document.querySelector('.boardCreationTitle').innerHTML = "Add New Board"
        document.querySelector('#createBoardColumnForm').style.display = 'block'
        createBoard()
        closeAsideBarMobile()
        clearAllInputFields()
    }



    // CREATING A NEW BOARD.
    /* This code adds a click event listener to an element with the class "createNewBoard". When that
    element is clicked, it calls the `createBoard()` function. */
    document.querySelector('.createNewBoard').addEventListener('click', ()=> {
        // remove the data-name attribute, when creating a new board 
        const boardNameField = document.getElementById('boardInputName')
        boardNameField.removeAttribute('data-name');
        document.querySelector('.boardCreationTitle').innerHTML = "Add New Board"
        document.querySelector('#createBoardColumnForm').style.display = 'block'
        document.querySelector('.addColumn').style.display = 'block'
        createBoard()
        closeAsideBarMobile()
        clearAllInputFields()
    })


    /* The above code is adding an event listener to the element with the class "closeBoardCreationForm".
    When this element is clicked, it will hide the elements with the classes "overLay" and "crudSection"
    by setting their display property to 'none'. */
    document.querySelector('.closeBoardCreationForm').addEventListener('click', () => {
        clearCrudSection()
    })



    // ADDING NEW COLUMN INPUT FIELD WHEN CREATING A NEW BOARD.
    /* This code adds a click event listener to an element with the class "addColumn". When that element is
    clicked, it performs the following actions: */
    document.querySelector('.addColumn').addEventListener('click', (addColumnBtn)=> {
        /* This code is adding a new column input field to the page when a button is clicked. */
        addColumnBtn.preventDefault()
        const numberColumn = getNumberOfColumnField()

        /* This code is checking if the number of column input fields is equal to 5. If it is, it calls the
        `addColumn()` function to add a new column input field and then hides the "Add Column" button by
        setting its display property to "none". If the number of column input fields is not equal to 5, it
        simply calls the `addColumn()` function to add a new column input field without hiding the "Add
        Column" button. */
        if(numberColumn + 1 === 6){
            addColumn()
            addColumnBtn.target.style.display = 'none'
        }
        else{
            addColumn()
        }

    })


    

    /* This code is adding a click event listener to an element with the class "saveBoard". When that
    element is clicked, it performs the following actions: */
    document.querySelector('.saveBoard').addEventListener('click', (saveBoard) => {
        saveBoard.preventDefault()


        const boardName = document.querySelector('.boardInputName').value 
        const boardNameInputDataName = document.querySelector('.boardInputName').dataset.name
        const allBoardColumns = document.querySelectorAll('.boardInputColumn')

        // changes each input border color if it is empty or not
        /* The code is iterating over each element with the class "boardInputColumn" and checking if its value
        length is equal to 0. If the value length is 0, it removes the class "border-line" and adds the
        class "border-red-500" to the element. If the value length is not 0, it adds the class "border-line"
        and removes the class "border-red-500" from the element. This code is essentially changing the
        border color of the input fields based on whether they are empty or not. */
        allBoardColumns.forEach( (boardInputColumn) => {
            if(boardInputColumn.value.length === 0){
                boardInputColumn.classList.remove('border-line')
                boardInputColumn.classList.add('border-red-500')
            }
            else{
                boardInputColumn.classList.add('border-line')
                boardInputColumn.classList.remove('border-red-500')
            }
        })


        // checks if all the input are empty ==> false or not == >True 
        /* This code block is checking if all the input fields with the class "boardInputColumn" have been
        filled out. If all the input fields have been filled out, it performs the following actions: */

        // GETTING THE BOARD NAME AND COLUMNS AND SAVING THEM.

        const KANBAN = JSON.parse(localStorage.getItem('KANBAN'))
        const boards = Object.keys(KANBAN)
        // 
        if (checkInputField('boardInputColumn')) {
            // Checking if its a new board
            if(boardNameInputDataName){
                if( boardName !== boardNameInputDataName){
                    KANBAN[boardName] = Object.assign({}, KANBAN[boardNameInputDataName]);
                    delete KANBAN[boardNameInputDataName]
                }
            }
            else{
                // Setting the Board Name, create a new board.
                KANBAN[boardName] = {}
            }

            const columnBoard = KANBAN[boardName]
            const columns = Object.keys(columnBoard)

            // // Setting the columns
            allBoardColumns.forEach( (allBoardColumn)=> {
                let columnName = allBoardColumn.value
                // close the gap btw words
                columnName = columnName.replace(/\s/g, "-")

                if(allBoardColumn.dataset.name){
                    if(allBoardColumn.dataset.name !== allBoardColumn.value){
                        KANBAN[boardName][columnName] = Object.assign({}, KANBAN[boardName][allBoardColumn.dataset.name]);
                        delete KANBAN[boardName][allBoardColumn.dataset.name]
                    }
                }
                else{
                    KANBAN[boardName][columnName] = {}
                }
                
            })

            let updateKanban = JSON.stringify(KANBAN)
            localStorage.setItem('KANBAN',updateKanban )
            // 
            document.querySelector('.overLay').style.display = 'none'
            // 
            postBoardCreation(boardName)
            clearAllInputFields()
        }
        clearCrudSection()
    })


    // Edit the board
    document.querySelector('.editBoardBtn').addEventListener('click', () => {
        createBoard()
        clearAllInputFields()
        document.querySelector('.addColumn').style.display = 'block'
        // 
        document.querySelector('.boardCreationTitle').innerHTML = 'Add New Column'
        document.querySelector('#createBoardColumnForm').style.display = 'block'
        const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
        const boardNameField = document.getElementById('boardInputName')
        boardNameField.value = activeBoard
        boardNameField.dataset.name = activeBoard
        document.querySelector('.default_colum_input').remove()
        // 
        const getKanban = JSON.parse(localStorage.getItem('KANBAN'))
        // 
        const columnBoard = getKanban[activeBoard]
        const columns = Object.keys(columnBoard)
        columns.forEach( (column) => {
            addColumn(column)
        })
    })


    /* This code adds a click event listener to an element with the class "deleteBoard". When that element
    is clicked, it performs the following actions: */
    document.querySelector('.deleteBoard').addEventListener('click', () => {  
        clearCrudSection()
        closeEveryThing()
        // 
        const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
        document.querySelector('.ConfirmDelete').style.display = 'block';
        document.querySelector('.overLay').style.display = 'flex';
        document.querySelector('.deleteWarningHeader').innerHTML = 'Delete this board?'
        document.querySelector('.deleteWarningText').innerHTML = `Are you sure you want to delete the '${activeBoard}' board? This action will remove all columns and tasks and cannot be reversed.`
    })

    /* The above code is adding an event listener to a button with the class "confirmBoardDelete". When the
    button is clicked, the code retrieves the kanban object from local storage, gets the name of the
    currently selected board, deletes the corresponding property from the kanban object, and then
    updates the local storage with the modified kanban object. After that, it calls the function
    "boardRefresh()" to update the UI. It also hides the article element that contains the delete board
    button, and hides the confirmation modal. */
    document.querySelector('.confirmBoardDelete').addEventListener('click', () => {
        const kanbanObj = JSON.parse(localStorage.getItem('KANBAN'))
        const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
        delete kanbanObj[activeBoard]
        localStorage.setItem('KANBAN', JSON.stringify(kanbanObj))
        // Close the article element that houses the delete board button
        const boardSetting = document.querySelector('article')
        boardSetting.classList.remove('block')
        boardSetting.classList.add('hidden')
        // close the confirmation modal
        document.querySelector('.overLay').style.display = 'none'
        document.querySelector('.ConfirmDelete').style.display = 'none';
        // 
        boardRefresh()
    })

    /* The above code is adding an event listener to the element with the class "closeConfirmationModal".
    When this element is clicked, the code performs the following actions:
    1. It selects the element with the tag "article" and assigns it to the variable "boardSetting".
    2. It removes the class "block" from the "boardSetting" element.
    3. It adds the class "hidden" to the "boardSetting" element.
    4. It sets the display property of the element with the class "overLay" to "none".
    5. It sets the display property of the element */
    document.querySelector('.closeConfirmationModal').addEventListener('click', () => {
        const boardSetting = document.querySelector('article')
        boardSetting.classList.remove('block')
        boardSetting.classList.add('hidden')
        document.querySelector('.overLay').style.display = 'none'
        document.querySelector('.ConfirmDelete').style.display = 'none';
    })


    /* This code adds a click event listener to an element with the class "boardSettingBtn". When that
    element is clicked, it toggles the visibility of an element with the tag name "article". */
    document.querySelector('.boardSettingBtn').addEventListener('click', () => {
        const boardSetting = document.querySelector('article')
        if(boardSetting.classList.contains('hidden')){
            boardSetting.classList.remove('hidden')
            boardSetting.classList.add('block')
        }
        else{
            boardSetting.classList.remove('block')
            boardSetting.classList.add('hidden')
        }
    })

    


    /* This code is adding a click event listener to an element with the class "mobileNavBar". When that
    element is clicked, it toggles the visibility of the aside navigation bar. */
    const mobileNavbarBtn = document.querySelector('.mobileNavBar')
    mobileNavbarBtn.addEventListener('click', (mobileBar) => {
        mobileNavbarBtn.classList.toggle('-rotate-180')
        const asideNavBar = document.querySelector('aside')
        if(asideNavBar.classList.contains('mobile:hidden')){
            asideNavBar.classList.remove('mobile:hidden')
            asideNavBar.classList.add('mobile:block')
        }
        else{
            asideNavBar.classList.remove('mobile:block')
            asideNavBar.classList.add('mobile:hidden')
        }
    })




    // COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION
    // COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION
    // COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION COLUMN SECTION

    document.querySelector('.addNewColumn').addEventListener('click', () => {
        createBoard()
        document.querySelector('.addColumn').style.display = 'block'
        clearAllInputFields()
        // 
        document.querySelector('.boardCreationTitle').innerHTML = 'Add New Column'
        document.querySelector('#createBoardColumnForm').style.display = 'block'
        const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
        const boardNameField = document.getElementById('boardInputName')
        boardNameField.dataset.name = activeBoard
        boardNameField.value = activeBoard
        boardNameField.disabled = true
        boardNameField.style.opacity = 0.3
        document.querySelector('.default_colum_input').remove()


        const getKanban = JSON.parse(localStorage.getItem('KANBAN'))


    /* The above code is iterating over the keys of the `columnBoard` object and calling the `addColumn`
    function for each key. It is assuming that the `addColumn` function takes a column as an argument
    and adds it to the kanban board. */
        const columnBoard = getKanban[activeBoard]
        const columns = Object.keys(columnBoard)
        columns.forEach( (column) => {
            addColumn(column)
        })

    })






    // COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS
    // COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS
    // COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS COLUMN TASKS


    /* The above code is adding an event listener to a button with the class "addTaskBtn". When the button
    is clicked, it performs the following actions: */
    document.querySelector('.addTaskBtn').addEventListener('click', () => {
        // 
        document.querySelector('.overLay').style.display = 'block';
        document.querySelector('.crudSection').style.display = 'block'
        document.querySelector('#addTask').style.display = 'block'
        // 
        document.querySelector('.boardCreationTitle').innerHTML = 'Add New Task';
        // 
        const currentBoard = document.querySelector('.selectedBoardStyles')
        const getKanban = JSON.parse(localStorage.getItem('KANBAN'))
        const activeBoardColumns = getKanban[currentBoard.dataset.name ]
        const list_activeBoardColumns = Object.keys(activeBoardColumns)


    /* The above code is iterating over each element in the `list_activeBoardColumns` array and creating an
    `<option>` element for each element. It sets the value and innerHTML of the `<option>` element to
    the current element in the iteration. It also adds the class 'taskColumnOptions' to the `<option>`
    element. Finally, it appends the `<option>` element to the `<select>` element in the document. */
        list_activeBoardColumns.forEach( (activeColumn) => {
            // 
            const columnOption = document.createElement('option')
            // 
            columnOption.value = activeColumn
            columnOption.innerHTML = activeColumn
            columnOption.classList.add('taskColumnOptions')
            document.querySelector('select').append(columnOption)
        })

    })


    /* The above code is adding an event listener to the element with the class "addNewSubTaskInput". When
    this element is clicked, it will prevent the default behavior of the click event and call the
    function "subTaskField()". */
    document.querySelector('.addNewSubTaskInput').addEventListener('click', (addNewSubTaskInput) => {
        addNewSubTaskInput.preventDefault()
        subTaskField()

    })

    // SAVE NEW TASKS AND RENDERS THEM
    document.querySelector('.saveCreatedTask').addEventListener('click', (saveCreatedTask) => {
        saveCreatedTask.preventDefault()
        
        const currentBoard = document.querySelector('.selectedBoardStyles').dataset.name 
        const taskInputFields = document.querySelectorAll('.taskInputField');


    /* The above code is written in JavaScript and it is performing the following tasks: */
        taskInputFields.forEach( (taskInputField) => {
        /* The above code is checking if the length of the value in the taskInputField is equal to 0. If it is,
        it adds a red border to the taskInputField for 900 milliseconds and then removes the red border. */
            if(taskInputField.value.length === 0){
                taskInputField.style.cssText = `border: 2px solid red`
                setTimeout( ()=> {
                    taskInputField.style.cssText = `border: 2px solid #374151`
                }, 900)
            }
        })

        /* The above code is checking if the input field with the id 'taskInputField' has a value. If it does,
        it retrieves the values of other input fields and selects on the page. It then retrieves the current
        state of the Kanban board from local storage, adds a new task to the chosen column with the task
        title as the key, and sets the task description and subtasks based on the input values. Finally, it
        saves the updated Kanban board state to local storage, updates the board display */
        if(checkInputField('taskInputField')){
            // 
            const taskTitle = document.querySelector('.taskTitle').value
            const taskDescription = document.querySelector('.taskDescription').value
            const subTaskInputs = document.querySelectorAll('.subTaskInput')
            const chosenColumn = document.querySelector('select').value
            // 
            const getKanban = JSON.parse(localStorage.getItem('KANBAN'))
            getKanban[currentBoard][chosenColumn][taskTitle] = []
            getKanban[currentBoard][chosenColumn][taskTitle].push({})
            getKanban[currentBoard][chosenColumn][taskTitle].push({})
            // 
            if(taskDescription.length > 1){
                getKanban[currentBoard][chosenColumn][taskTitle][0]['Description'] = taskDescription
            }
            else{
                getKanban[currentBoard][chosenColumn][taskTitle][0]['Description'] = "No Description"
            }
            // 
            subTaskInputs.forEach( (subTaskInput) => {
                getKanban[currentBoard][chosenColumn][taskTitle][1][subTaskInput.value] = false 
            })

            /* The above code is converting the `getKanban` object into a JSON string using `JSON.stringify()`. It
            then saves the JSON string in the browser's local storage with the key 'KANBAN' using
            `localStorage.setItem()`. */
            let saveNewTask = JSON.stringify(getKanban)
            localStorage.setItem('KANBAN', saveNewTask)
            /* The above code is calling three functions: postBoardCreation(currentBoard), closeEveryThing(), and
            clearAllInputFields(). It is not clear what these functions do without further context. */
            postBoardCreation(currentBoard)
            closeEveryThing()
            clearAllInputFields()

        }
    })


    /* The above code is adding an event listener to an element with the class "taskSetting". When this
    element is clicked, the code toggles the visibility of an element with the id "taskSettingItems". If
    the "taskSettingItems" element is currently hidden, it will be displayed (by removing the "hidden"
    class and adding the "block" class). If the "taskSettingItems" element is currently displayed, it
    will be hidden (by removing the "block" class and adding the "hidden" class). */
    document.querySelector('.taskSettinng').addEventListener('click', () => {
        // 
        const taskSetting = document.querySelector('#taskSettingItems')
        if(taskSetting.classList.contains('hidden')){
            taskSetting.classList.remove('hidden')
            taskSetting.classList.add('block')
        }
        else{
            taskSetting.classList.remove('block')
            taskSetting.classList.add('hidden')
        }
        // 
    })


    /* The above code is adding an event listener to an element with the class "closeTask". When this
    element is clicked, it hides several elements on the page by setting their display property to
    "none". It also calls a function called "clearDynamicElement_Task" to clear any dynamically created
    elements related to tasks. Finally, it refreshes the board by calling a function called
    "postBoardCreation" with the active board as a parameter. */
    document.querySelector('.closeTask').addEventListener('click', () => {
        document.querySelector('.overLay').style.display = 'none';
        document.querySelector('.crudSection').style.display = 'none'
        document.querySelector('.taskBoardInfo').style.display = 'none'
        // 
        clearDynamicElement_Task()
        // refreshing the board
        const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
        postBoardCreation(activeBoard)
    })

    /* The above code is adding an event listener to the element with the class "deleteTask". When this
    element is clicked, it will display a confirmation message by setting the display property of the
    element with the class "taskConfirmDelete" to "block" and the display property of the element with
    the class "overLay" to "flex". It also hides the elements with the classes "crudSection" and
    "taskBoardInfo" by setting their display properties to "none". */
    document.querySelector('.deleteTask').addEventListener('click', () => {
        document.querySelector('.taskConfirmDelete').style.display = 'block'
        document.querySelector('.overLay').style.display = 'flex'
        // 
        document.querySelector('.crudSection').style.display = 'none'
        document.querySelector('.taskBoardInfo').style.display = 'none'
        // 
        document.querySelector('.taskDeleteWarningHeader').innerHTML = 'Delete this task?'
        const taskTitle = document.querySelector('#taskTitle').innerHTML
        document.querySelector('.taskDeleteWarningText').innerHTML = `Are you sure you want to delete the '${taskTitle}' task? This action will remove all tasks and subtasks and cannot be reversed.`
        // removing the taskSetting
        const taskSetting = document.querySelector('#taskSettingItems')
        taskSetting.classList.remove('block')
        taskSetting.classList.add('hidden')
    })

    document.querySelector('.taskConfirmDelete').addEventListener('click', () => {
        const getKanban = JSON.parse(localStorage.getItem('KANBAN'))
        const currentBoard = document.querySelector('.selectedBoardStyles').dataset.name
        const currentColumn = document.querySelector('.taskColumnName').innerHTML
        const taskTitle = document.querySelector('#taskTitle').innerHTML
        // 
        delete getKanban[currentBoard][currentColumn][taskTitle]
        localStorage.setItem('KANBAN', JSON.stringify(getKanban))
        // 
        postBoardCreation(currentBoard)
        // 
        document.querySelector('.taskConfirmDelete').style.display = 'none'
        document.querySelector('.overLay').style.display = 'none'

        
    })

    /* The above code is adding an event listener to the element with the
    class "closeTaskConfirmationModal". When this element is clicked, the code inside the arrow function
    will be executed. */
    document.querySelector('.closeTaskConfirmationModal').addEventListener('click', () => {
        // 
        clearDynamicElement_Task()
        // 
        document.querySelector('.overLay').style.display = 'none'
        document.querySelector('.taskConfirmDelete').style.display = 'none';
    })

    /**
     * The function clears dynamic elements from the task info board and hides the task setting.
     */
    function clearDynamicElement_Task(){
        // clearng subtask from the task info board 
        const subTasks = document.querySelectorAll('.subTask')
        subTasks.forEach( (subTask) => {
            subTask.remove()
        })
        // removing the taskSetting
        const taskSetting = document.querySelector('#taskSettingItems')
        taskSetting.classList.remove('block')
        taskSetting.classList.add('hidden')
    }




})

























