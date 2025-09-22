function downloadResume() {
    const link = document.createElement('a');
    link.href = 'misc/Resume_MunirAwwad.pdf';
    link.download = 'Resume_MunirAwwad.pdf';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const n1 = document.getElementById("n-1");
const s1 = document.getElementById("s-1");

const today = new Date();

const start1 = new Date(2025,8,8);
const years1 = today.getUTCFullYear() - start1.getUTCFullYear();
const months1 = today.getUTCMonth() - start1.getUTCMonth();
let totalMonths1 = years1 * 12 + months1;

n1.innerText = totalMonths1.toString();

if (totalMonths1 == 1){
    s1.innerText = "";
}