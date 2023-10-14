/**
 * The function `setDimension()` adjusts the height and width of various elements on the page based on
 * the window size and the dimensions of other elements.
 */
export function setDimension(){
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    /* This code is adjusting the height and margin of various elements on the page based on the window
    size and the dimensions of other elements. */
    const navHeaderHeight = document.querySelector('header').offsetHeight;
    document.querySelector('#main_container').style.cssText = `margin-top: ${navHeaderHeight}px; max-height: ${windowHeight - navHeaderHeight}px`
    if(windowWidth > 767){
        document.querySelector('aside').style.cssText = `height: ${windowHeight - navHeaderHeight}px`
    }
    // OPERATION 2: GETTING THE WIDTH OF THE SIDEBAR AND GIVING THE APPROPRIATE PADDING FOR ELEMENT BELOW IT
    /* This code is getting the width of the sidebar element using
    `document.querySelector('aside').offsetWidth` and storing it in the variable `sideBarWidth`. */
    const sideBarWidth = document.querySelector('aside').offsetWidth;
    if(windowWidth > 767){
        document.querySelector('.board_column').style.cssText =`margin-left: ${sideBarWidth}px; width: ${windowWidth - sideBarWidth}px;height: ${window.innerHeight - navHeaderHeight - 5}px`
    }
    // 
    const boardColumnHeight = window.innerHeight - navHeaderHeight - 10
    document.querySelector('.board_column').style.height = `${boardColumnHeight}px`
    localStorage.setItem('KanbanBoardHeight', boardColumnHeight)
    // 
} 


/**
 * The function adjusts the width of a container element based on the number of columns it contains.
 */
export function column_arrangement(){
    const coulumnsCount  = document.querySelectorAll('.column').length
    document.querySelector('.board_column').style.width = `${coulumnsCount * 340}px`
}



/**
 * The function "getNumberOfColumnField" returns the number of child elements in the element with the
 * class "column_input_container".
 * @returns the number of child elements in the element with the class "column_input_container".
 */
export function getNumberOfColumnField(){
    const numberOfColumn = document.querySelector('.column_input_container').childElementCount
    return numberOfColumn
}


/**
 * The function `getNumberOfSubTaskField` returns the number of child elements in the
 * `.subtaskContainer` element.
 * @returns the number of child elements within the element with the class "subtaskContainer".
 */
export function getNumberOfSubTaskField(){
    const numberOfSubTask = document.querySelector('.subtaskContainer').childElementCount
    return numberOfSubTask
}



/**
 * The function creates a board by displaying a special element and a createBoard element.
 */
export function createBoard(){
    document.querySelector('.overLay').style.display = 'flex'
    document.querySelector('.crudSection').style.display = 'block'
}


/**
 * The function checks if all input fields with a specific class name have a value.
 * @param classname - The `classname` parameter is a string that represents the class name of the input
 * fields you want to check.
 * @returns a boolean value indicating whether all input fields with the specified class name have a
 * value or not.
 */
export function checkInputField(classname){
    let boardColumninputFilelds = document.querySelectorAll(`.${classname}`)
    const allColumninputfields = Array.from(boardColumninputFilelds).every(input => input.value !== "")
    return allColumninputfields
}




/**
* The function adds a new column to a container and adds a delete button to each column, this function adds a delete button to each column input div if it has less than 2 child elements.
*/
export function addColumn(name = ""){

    const newColumn = document.createElement(`div`)
    newColumn.className = 'column_input_div dynamicField'
    if (name.length > 1){
        newColumn.innerHTML = `<input class="boardInput border-line  boardInputColumn columnsInputField" type="text" value = ${name}  data-name = ${name}>`
    }
    else{
        newColumn.innerHTML = `<input class="boardInput border-line  boardInputColumn" type="text">`
    }
    document.querySelector('.column_input_container').append(newColumn)

    const closeBtn = `<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>`
    document.querySelectorAll('.column_input_div').forEach( (column_input_div) => {
        const columnInputDivCount = column_input_div.childElementCount
        if(columnInputDivCount < 2){
            const closeBtnDiv = document.createElement('div')
            closeBtnDiv.classList.add('closeColumnField')
            closeBtnDiv.classList.add('cursor-pointer')
            closeBtnDiv.innerHTML = closeBtn
            closeBtnDiv.style.display = 'block'

            closeBtnDiv.addEventListener('click', () => {
                // const columnBoard = getKanban[activeBoard]
                // const columns = Object.keys(columnBoard)
                const parentContainer = closeBtnDiv.parentNode

                if(name.length > 1){
                    const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
                    const getKanban = JSON.parse(localStorage.getItem('KANBAN'))
                    const specificColumnName = parentContainer.querySelector('input').value
                    delete getKanban[activeBoard][specificColumnName]
                    localStorage.setItem('KANBAN', JSON.stringify(getKanban))
                }

                parentContainer.remove()
                if (getNumberOfColumnField() < 6){
                    document.querySelector('.addColumn').style.display = 'block'
                }

                if(getNumberOfColumnField() == 1){
                    document.querySelector('.closeColumnField').remove()
                }

            })

            column_input_div.append(closeBtnDiv)
        }
    })
}





/**
 * The `postBoardCreation` function creates and updates the Kanban board interface based on the data
 * stored in the `KANBAN` object in local storage.
 * @param nameOfBoard - The name of the board that is being created or selected.
 */
export function postBoardCreation(nameOfBoard){

    const KANBAN = JSON.parse(localStorage.getItem('KANBAN'))
    document.querySelector('.boardName').innerHTML = nameOfBoard

    const boards = Object.keys(KANBAN)
    // gets the number of boards from KANBAN object and adds it to the DOM
    document.querySelector('.boardCount').innerHTML = `(${boards.length})`

    /* The code `document.querySelector('.boardContainer').innerHTML = ""` is setting the inner HTML of the
    element with the class "boardContainer" to an empty string. This effectively clears the content of
    the element, removing any existing HTML elements and text inside it. */
    document.querySelector('.boardContainer').innerHTML = ""

    // this code clears the column board container
    document.querySelector('.boardColumnContainer').innerHTML = ""

    // Looping through the kanban board array to get individaul boards
    for(let boardName = 0; boardName < boards.length; boardName++){  

       /* The code block is creating a board element for each board in a Kanban system. It sets the
       necessary classes and appends child elements to the board element, such as a board name and
       columns with tasks. */
        const boardDiv = document.createElement('div')
        boardDiv.dataset.name = boards[boardName]
        boardDiv.classList.remove('selectedBoardStyles')
        if(nameOfBoard == boards[boardName]){
            boardDiv.classList.add('selectedBoardStyles')

            // getting the columns
            const columnBoard = KANBAN[boards[boardName]]
            const columns = Object.keys(columnBoard)

            // Creating the elements in each individual column
            for(let columnName = 0; columnName < columns.length; columnName++){

                /* This code block is creating a column element for each column in a specific Kanban board. It sets the
                necessary classes and appends child elements to the column element, such as a column title and a
                task container. */
                const columnDiv = document.createElement('div')
                columnDiv.classList.add('column')
                columnDiv.classList.add('dynamicColumn')
                columnDiv.classList.add('flex-auto')

                const columnTitle = document.createElement('div') 
                columnTitle.classList.add('column_title')

                const columnTitleSpan = document.createElement('span')
                columnTitleSpan.classList.add('column_title_span')
                columnTitleSpan.style.background = randomHexCode()

                const columnTitleHtag = document.createElement('h3')

                columnTitle.append(columnTitleSpan)
                columnTitle.append(columnTitleHtag)

                columnDiv.append(columnTitle)

                const taskContainer = document.createElement('div')
                taskContainer.classList.add('task_container')

                // Getting all task and subtasks
                let taskBoard = KANBAN[boards[boardName]][columns[columnName]]
                taskBoard = invertObj(taskBoard)
                // 
                const tasks = Object.keys(taskBoard)

                columnTitleHtag.innerHTML = `${[columns[columnName]]} (${tasks.length})`
    

                for(let taskName = 0; taskName < tasks.length; taskName++){
                    /* This code block is creating a task element for each task in a specific column of a Kanban board. */
                    const subTaskBoard = KANBAN[boards[boardName]][columns[columnName]][tasks[taskName]]
                    const numberOfSubTask = Object.keys(subTaskBoard[1]).length

                    const task = document.createElement('div')
                    task.classList.add('task')
                    task.classList.add('taskInfo')
                    task.dataset.columnTitle = columns[columnName]
                    task.dataset.taskTitle = tasks[taskName]

                    task.addEventListener('click', () => {
                        // clearng any subtask from the task info board 
                        const subTasksData = document.querySelectorAll('.subTask')
                        subTasksData.forEach( (subTask) => {
                            subTask.remove()
                        })
                        // getting data stored in local storage
                        const getKanban = JSON.parse(localStorage.getItem('KANBAN'))
                        const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
                        // revaling the task board to get more info
                        document.querySelector('.overLay').style.display = 'flex'
                        document.querySelector('.taskBoardInfo').style.display = 'block'
                        document.querySelector('.crudSection').style.display = 'none'
                        // adding values stored concerning a task to the DOM
                        const columnName = task.dataset.columnTitle
                        document.querySelector('.taskColumnName').innerHTML = columnName
                        const taskTitle = task.dataset.taskTitle
                        document.querySelector('#taskTitle').innerHTML = taskTitle
                        const taskDescription = getKanban[activeBoard][columnName][taskTitle][0]['Description']
                        document.querySelector('#taskDescription').innerHTML = taskDescription
                        // Getting alll tasks and converting the keys to an array
                        const subTasks = getKanban[activeBoard][columnName][taskTitle][1]
                        const list_subTasks = Object.keys(subTasks)
                        // getting the number of completed subtasks and number of tasks, then add it to the dom in doneTaskCount div
                        let completedSubTasks = countTrue(subTasks)
                        document.querySelector('#doneTaskCount').innerHTML = `(${completedSubTasks} of ${list_subTasks.length})`
                        // 
                        // Adding subtasks to the DOM
                        list_subTasks.forEach( (list_subTask) => {

                            const subTask = document.createElement('div')
                            subTask.classList.add('subTask')
                            // 
                            const checkBox = document.createElement('div')
                            checkBox.classList.add('checkbox')
                            // 
                            const checkImg = document.createElement('img')
                            checkImg.src = './assets/icon-check.svg'
                            checkImg.classList.add('checkImage')
                            checkImg.style.display = 'none'
                            checkBox.append(checkImg)
                            // 
                            const subtaskTitle = document.createElement('div')
                            subtaskTitle.classList.add('subtaskTitle')
                            subtaskTitle.innerHTML = list_subTask
                            // 
                            if (subTasks[list_subTask] === true){
                                checkBox.classList.add('checked')
                                subtaskTitle.classList.add('line-through')
                                checkImg.style.display = 'block'
                            }
                            else{
                                checkBox.classList.add('notChecked')
                            }
                            // 
                            subTask.append(checkBox)
                            // 
                            subTask.append(subtaskTitle)

                            document.querySelector('.viewSubtasks').append(subTask)

                            subTask.addEventListener('click', () => {
                                // 
                                checkBox.classList.remove('checked')
                                checkBox.classList.remove('notChecked')
                                // 
                                const subTaskCheckbox = subTask.querySelector('.checkbox')
                                const subTaskName = subTask.querySelector('.subtaskTitle')
                                if (subTasks[subTaskName.innerHTML] === false){
                                    subTasks[subTaskName.innerHTML] = true
                                    checkImg.style.display = 'block'
                                    // 
                                    checkBox.classList.add('checked')
                                    subtaskTitle.classList.add('line-through')
                                    
                                }
                                else{
                                    subTasks[subTaskName.innerHTML] = false
                                    checkImg.style.display = 'none'
                                    // 
                                    checkBox.classList.add('notChecked')
                                    subtaskTitle.classList.remove('line-through')
                                    
                                }
                                // update local storage
                                localStorage.setItem('KANBAN', JSON.stringify(getKanban))
                                document.querySelector('#doneTaskCount').innerHTML = `(${countTrue(subTasks)} of ${list_subTasks.length})`
                            })
                        })


                    })

                    const taskHtag = document.createElement('h1')
                    taskHtag.classList.add('task_htag')
                    taskHtag.innerHTML = tasks[taskName]

                    const taskPtag = document.createElement('p')
                    taskPtag.classList.add('task_ptag')
                    taskPtag.innerHTML = `${countTrue(subTaskBoard[1])} of ${numberOfSubTask} subtasks`
                    
                    // console.log( taskBoard[tasks[taskName]][0]["Description"])

                    task.append(taskHtag)
                    task.append(taskPtag)
                    taskContainer.append(task)
                }


                if(taskContainer.innerHTML.length == 0){
                    taskContainer.classList.add('dottedBorder')
                }
                columnDiv.append(taskContainer)
                document.querySelector('.boardColumnContainer').append(columnDiv)
                column_arrangement()

            }


        }
        else{
            boardDiv.classList.add('boardStyles')
            // Adding an event listener to dynamically created elements.
            boardDiv.addEventListener('click', () => {
                postBoardCreation(boardDiv.dataset.name)
                closeAsideBarMobile()
            })
        }

        const boardItem = `<img src="./assets/icon-board.svg" alt=""> <h2>${ boards[boardName]}</h2>`
        boardDiv.innerHTML = boardItem

        document.querySelector('.boardContainer').append(boardDiv)

    }

    const boardSetting = document.querySelector('article')
    boardSetting.classList.remove('block')
    boardSetting.classList.add('hidden')


}



/**
 * The function `countTrue` counts the number of `true` values in a given dictionary.
 * @param dict - The `dict` parameter is an object that contains key-value pairs. The keys are strings
 * and the values are boolean values.
 * @returns The function `countTrue` returns the count of `true` values in the input dictionary.
 */
export function countTrue(dict){
    let count = 0
    for(const key in dict){
        if (dict[key] === true){
            count += 1
        }
    }
    return count
}

/**
 * The function `invertObj` takes an object as input and returns a new object with the keys and values
 * inverted.
 * @param dict - The `dict` parameter is an object that represents a dictionary. It contains key-value
 * pairs, where the keys are strings and the values can be of any type.
 * @returns The function `invertObj` returns an inverted object where the keys and values of the input
 * object `dict` are swapped.
 */
function invertObj(dict){
    let invert_obj = {}
    let reverse_obj = Object.keys(dict).reverse()
    reverse_obj.forEach( (x) => {
        invert_obj[x] = dict[x]
    });
    return invert_obj
}



// Random hexadecimal code
/**
 * The function randomHexCode generates a random hexadecimal color code.
 * @returns a randomly generated hexadecimal color code in the format "#xxxxxx", where each x
 * represents a random digit or letter from 0 to f.
 */
function randomHexCode(){
    const numbs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    let result = ""
    for(let i = 0; i < 6; i++){
        let randomElement = Math.floor(Math.random() * numbs.length)
        const element = numbs[randomElement]
        result += element
    }

    return '#'+result
}


/**
 * The function `boardRefresh` retrieves the KANBAN data from local storage, extracts the board names,
 * and then calls a function to create the boards.
 */
export function boardRefresh(){
    const KANBAN = JSON.parse(localStorage.getItem('KANBAN'))
    const board = Object.keys(KANBAN)[0]
    if(KANBAN){
        if(board){
            postBoardCreation(board)
        }
        else{
            const dynamicColumns = document.querySelectorAll('.dynamicColumn')
            dynamicColumns.forEach( (dynamicColumn)=> {
                dynamicColumn.remove()
            })
            // 
            document.querySelector('.boardName').innerHTML = "Create Board"
            document.querySelector('.boardCreationTitle').innerHTML = "Add New Board"
            document.querySelector('#createBoardColumnForm').style.display = 'block'
            createBoard()
            closeAsideBarMobile()
            clearAllInputFields()
        }
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
}


/**
 * The function `closeAsideBarMobile` toggles the visibility of a mobile navigation bar and hides an
 * aside navigation bar if the window width is less than or equal to 767 pixels.
 */
export function closeAsideBarMobile(){
    if(window.innerWidth <= 767){
        document.querySelector('.mobileNavBar').classList.toggle('-rotate-180')
        const asideNavBar = document.querySelector('aside')
        asideNavBar.classList.remove('mobile:block')
        asideNavBar.classList.add('mobile:hidden')
    }
}


/**
 * The function `boardDeletion()` deletes the active board from the `kanbanObj` object stored in the
 * browser's localStorage and refreshes the board.
 */
export function boardDeletion(){
    const kanbanObj = JSON.parse(localStorage.getItem('KANBAN'))
    const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
    delete kanbanObj[activeBoard]
    localStorage.setItem('KANBAN', JSON.stringify(kanbanObj))
    boardRefresh()
}



/**
 * The function "subTaskField" creates a new subtask input field, adds a close button to the field, and
 * handles the logic for adding and removing subtask fields.
 */
export function subTaskField(){

    const newsubTask = document.createElement(`div`)
    newsubTask.className = 'subTaskInputContainer dynamicField'
    newsubTask.innerHTML = `<input class="addTaskInputField taskInputField subTaskInput dynamicSubTaskInput" type="text">`
    document.querySelector('.subtaskContainer').append(newsubTask)

    const closeBtn = `<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>`
    document.querySelectorAll('.subTaskInputContainer').forEach( (subTaskInputContainer) => {
        const subTaskInputDivCount = subTaskInputContainer.childElementCount
        if(subTaskInputDivCount < 2){
            const closeBtnDiv = document.createElement('div')
            closeBtnDiv.classList.add('cursor-pointer')
            closeBtnDiv.classList.add('closeSubtaskField')
            closeBtnDiv.innerHTML = closeBtn
            closeBtnDiv.style.display = 'block'

            closeBtnDiv.addEventListener('click', () => {
                // const columnBoard = getKanban[activeBoard]
                // const columns = Object.keys(columnBoard)
                const parentContainer = closeBtnDiv.parentNode

                // if(name.length > 1){
                //     const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
                //     const getKanban = JSON.parse(localStorage.getItem('KANBAN'))
                //     const specificColumnName = parentContainer.querySelector('input').value
                //     delete getKanban[activeBoard][specificColumnName]
                //     localStorage.setItem('KANBAN', JSON.stringify(getKanban))
                // }

                parentContainer.remove()
                if (getNumberOfSubTaskField() < 6){
                    document.querySelector('.addNewSubTaskInput').style.display = 'block'
                }
                if(getNumberOfSubTaskField() == 1){
                    document.querySelector('.closeColumnField').remove()
                }

            })
            /* The code is checking if the number of subtask fields is equal to 6. If it is, it hides the
            "addNewSubTaskInput" element and appends the "closeBtnDiv" element to the "subTaskInputContainer".
            If the number of subtask fields is not equal to 6, it only appends the "closeBtnDiv" element to the
            "subTaskInputContainer". */
            if(getNumberOfSubTaskField() == 6){
                document.querySelector('.addNewSubTaskInput').style.display = 'none'
                subTaskInputContainer.append(closeBtnDiv)
            } 
            else{
                subTaskInputContainer.append(closeBtnDiv)
            }
        }
    })
}


/**
 * The function `closeEveryThing` hides certain elements on the page and removes any dynamically
 * created subtask inputs.
 */
export function closeEveryThing(){
    document.querySelector('#addTask').style.display = 'none'
    document.querySelector('#createBoardColumnForm').style.display = 'none'
    document.querySelector('.overLay').style.display = 'none'
    // 
    const dynamicSubTaskInputs = document.querySelectorAll('.dynamicSubTaskInput')
    dynamicSubTaskInputs.forEach( (dynamicSubTaskInput)=> {
        dynamicSubTaskInput.remove()
    })

    const closeSubtaskFields = document.querySelectorAll('.closeSubtaskField')
    closeSubtaskFields.forEach( (closeSubtaskField)=> {
        closeSubtaskField.remove()
    })

    const options = document.querySelectorAll('option')
    options.forEach( (option)=> {
        option.remove()
    })

    document.querySelector('textarea').value = ""
}

/**
 * The function clears the value of all text input fields on a webpage.
 */
export function clearAllInputFields(){
    document.querySelectorAll("input[type = 'text']").forEach( (input)=> {
        input.value = ""
    })

    /* The code is selecting all elements with the class "dynamicField" using the
    `document.querySelectorAll()` method. It then iterates over each selected element using the
    `forEach()` method and removes each element from the DOM using the `remove()` method. This code is
    effectively clearing or deleting all elements with the class "dynamicField" from the webpage. */
    const dynamicFields = document.querySelectorAll('.dynamicField')
    dynamicFields.forEach( (dynamicField)=> {
        dynamicField.remove()
    })

    /* The above code is written in JavaScript and it is selecting all elements with the class name
    "closeColumnField" using the querySelectorAll method. It then iterates over each selected element
    using the forEach method and removes each element from the DOM using the remove method. */
    const closeColumnFields = document.querySelectorAll('.closeColumnField')
    closeColumnFields.forEach( (closeColumnField)=> {
        closeColumnField.remove()
    })

    const boardNameField = document.getElementById('boardInputName')
    boardNameField.disabled = false
    boardNameField.style.opacity = 1
    const defaultColumn = `<div class="column_input_div default_colum_input"><input class="boardInput border-line boardInputColumn default_colum_inputField" type="text"></div>`
    document.querySelector('.column_input_container').innerHTML = defaultColumn
}


/**
 * The function `clearCrudSection` hides various elements on the page and clears input fields.
 */
export function clearCrudSection(){
    document.querySelector('.overLay').style.display = 'none'
    document.querySelector('.crudSection').style.display = 'none'
    document.querySelector('#addTask').style.display = 'none'
    document.querySelector('#createBoardColumnForm').style.display = 'none'

    clearAllInputFields()
    closeEveryThing()
}



