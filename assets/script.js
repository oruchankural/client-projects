const form = document.querySelector("form"),
    fileInput = document.querySelector(".file-input"),
    progressArea = document.querySelector(".progress-area"),
    uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
    fileInput.click();
});
fileInput.onchange = ({ target }) => {
    let files = target.files;
    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file) {
            formData.append(`file`, file);
        }
    }
    let xhr = new XMLHttpRequest();
    // method via server:node.js port
    xhr.open("POST", "http://127.0.0.1:3000/uploads");
    xhr.upload.addEventListener("progress", ({ loaded, total }) => {
        let fileLoaded = Math.floor((loaded / total) * 100);
        let fileTotal = Math.floor(total / 1000);
        let fileSize;
        (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB";
        let progressHTML = `<li class="row">
                              <i class="fas fa-file-alt"></i>
                              <div class="content">
                                <div class="details">
                                  <span class="name">All Files • Uploading</span>
                                  <span class="percent">${fileLoaded}%</span>
                                </div>
                                <div class="progress-bar">
                                  <div class="progress" style="width: ${fileLoaded}%"></div>
                                </div>
                              </div>
                            </li>`;
        uploadedArea.classList.add("onprogress");
        progressArea.innerHTML += progressHTML;
    });
    xhr.onload = () => {
        if (xhr.status === 200) {
            let uploadedHTML = `<li class="row">
                                <div class="content upload">
                                  <i class="fas fa-file-alt"></i>
                                  <div class="details">
                                    <span class="name">All Files • Uploaded</span>
                                    <span class="size">${fileSize}</span>
                                  </div>
                                </div>
                                <i class="fas fa-check"></i>
                              </li>`;
            uploadedArea.classList.remove("onprogress");
            uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
        } else {
            alert("Bir hata oluştu. Dosyalar yüklenemedi.");
        }
    };
    xhr.send(formData);
}
