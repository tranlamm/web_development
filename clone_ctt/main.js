originTTSV = {
    'mssv': '20204759',
    'hoVaTen': 'Trần Lâm',
    'namVaoTruong': '2020',
    'bacDaoTao': 'Đại học đại trà',
    'chuongTrinh': 'Kỹ thuật Máy tính 2020',
    'khoaVienQuanLy': 'Trường Công nghệ Thông tin và Truyền thông',
    'tinhTrangHocTap': 'Học',
    'gioiTinh': 'Nam',
    'lop': 'Kỹ thuật máy tính 01-K65',
    'khoaHoc': '65',
    'email': 'lam.t204759@sis.hust.edu.vn',
    'avatarPath': './image/ctt_avatar_origin.png'
}

TTSV = {
    'mssv': '20204759',
    'hoVaTen': 'Trần Lâm',
    'namVaoTruong': '2020',
    'bacDaoTao': 'Đại học đại trà',
    'chuongTrinh': 'Kỹ thuật Máy tính 2020',
    'khoaVienQuanLy': 'Trường Công nghệ Thông tin và Truyền thông',
    'tinhTrangHocTap': 'Học',
    'gioiTinh': 'Nam',
    'lop': 'Kỹ thuật máy tính 01-K65',
    'khoaHoc': '65',
    'email': 'lam.t204759@sis.hust.edu.vn',
    'avatarPath': './image/ctt_avatar_origin.png'
}

const edit = (sinhVien) => {
    for (const property in sinhVien)
    {
        let value;
        element = document.getElementById(`${property}`);
        if (property == "avatarPath")
        {
            formElement = document.getElementById(`form_${property}`);
            if (formElement.files[0])
            {
                url = URL.createObjectURL(formElement.files[0]);
                sinhVien[property] = url;
            }
        }
        else
        {
            if (property == 'tinhTrangHocTap' || property == 'gioiTinh')
            {
                formElement = document.querySelectorAll(`input[name=${property}]`);
                formElement.forEach(item => {
                    if (item.checked == true)
                    {
                        value = item.value;
                    }
                })
            }
            else
            {
                formElement = document.getElementById(`form_${property}`);
                value = formElement.value;
            }
            sinhVien[property] = value;
        }
    }
}

const reRenderHTML = (sinhVien) => {
    for (const property in sinhVien)
    {
        let value = sinhVien[property];
        element = document.getElementById(`${property}`);
        if (property == "avatarPath")
            element.src = sinhVien[property];
        else
            element.textContent = value;
    }
    document.getElementById('nav_name').textContent = sinhVien.hoVaTen;
    document.getElementById('nav_ava').src = sinhVien.avatarPath;
}

const reRenderForm = (sinhVien) => {
    for (const property in sinhVien)
    {
        let value = sinhVien[property];
        if (property == 'tinhTrangHocTap' || property == 'gioiTinh')
        {
            formElement = document.querySelectorAll(`input[name=${property}]`);
            formElement.forEach(item => {
                if (item.value == value)
                {
                    item.checked = true;
                }
            })
        }
        else 
        {
            formElement = document.getElementById(`form_${property}`);
            if (property == 'avatarPath')
                formElement.value = '';
            else
                formElement.value = value;
        }
    }
}

const reset = () => {
    Object.assign(TTSV, originTTSV);
    reRenderForm(TTSV);
    reRenderHTML(TTSV);
}

let isEdit = false;
const toogleEdit = () => {
    if (isEdit)
    {
        document.querySelectorAll('.editable').forEach((el) => {
            el.style.display = 'none';
        })
        document.querySelectorAll('.non_editable').forEach((el) => {
            el.style.display = 'inline-block';
        })
    }
    else
    {
        document.querySelectorAll('.editable').forEach((el) => {
            el.style.display = 'block';
        })
        document.querySelectorAll('.non_editable').forEach((el) => {
            el.style.display = 'none';
        })
    }
    isEdit = !isEdit;
}

const editBtn = document.getElementById('edit_btn');
const okBtn = document.getElementById('ok_btn');
const cancelBtn = document.getElementById('cancel_btn');
const resetBtn = document.getElementById('reset_btn');

// Edit button action
editBtn.onclick = (event) => {
    event.preventDefault();
    if (!isEdit)
    {
        toogleEdit();
    }
}

// Ok button action
okBtn.onclick = (event) => {
    event.preventDefault();
    if (isEdit)
    {
        edit(TTSV);
        reRenderHTML(TTSV);
        console.log(TTSV);
        toogleEdit();
    }
}

// Cancel button action
cancelBtn.onclick = (event) => {
    event.preventDefault();
    if (isEdit)
    {
        reRenderForm(TTSV);
        console.log(TTSV);
        toogleEdit();
    }
}

// Reset button action
resetBtn.onclick = (event) => {
    event.preventDefault();
    if (isEdit)
    {
        reset();
        console.log(TTSV);
        toogleEdit();
    }
}