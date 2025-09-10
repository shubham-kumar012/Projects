
function showToast() {
    const toastElement = document.getElementById('myToast');

    const toast = new bootstrap.Toast(toastElement, { delay: 1000 }); // 1 second
    toast.show();
}

// stop reload and send POST request manually
async function stopReload(event) {
    event.preventDefault();

    let input = document.querySelector(".task-input");
    const taskName = input.value;
    if(!taskName) return;
    
    try {
        let response = await fetch('/tasks/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },  
            body: JSON.stringify({taskName})
        });
        
        if(!response.ok) {
            console.log("Failed to add task");
            return;
        }
        input.value = '';
        showToast();
        
    } catch(err) {
        console.log("Error: ", err);
    }
}

