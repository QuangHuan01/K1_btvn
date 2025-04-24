const questions = document.querySelectorAll(".accordion-question");
questions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    answer.classList.toggle("active");
  });
});
