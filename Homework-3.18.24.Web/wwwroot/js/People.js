$(() => {

    const modal = new bootstrap.Modal($(".modal")[0]);

    function loadPeople() {
        $.get('/home/getpeople', function (people) {
            $("tbody tr").remove();
            people.forEach(person => {
                $("tbody").append(`
<tr>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>
    <td> <button class="btn btn-info" data-person-id="${person.id}"> Edit </button> </td>
    <td> <button class='btn btn-danger' data-person-id="${person.id}"> Delete </button> </td>

</tr>
`);
            });
        });
    }

    loadPeople();

    $("table").on("click", ".btn-info", function () {
        $.get(`/home/getPersonById?id=${$(this).data('person-id')}`, function (person) {
            $(".modal-title").text("Edit");
            $("#firstName").val(person.firstName);
            $("#lastName").val(person.lastName);
            $("#age").val(person.age);
            $("#id").val(person.id);

            modal.show();
        });
    });

    $("table").on("click", ".btn-danger", function () {
        $.post(`/home/deleteperson?id=${$(this).data("person-id")}`, function () {
            loadPeople();
        });
    });

    $("#show-add").on('click', function () {
        clearModal();
        $(".modal-title").text("Add Person");
        modal.show();
    });

    $("#save-person").on('click', function () {
        const person = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            age: $("#age").val(),
            id: $("#id").val()
        }

        let action = $(".modal-title").text() === "Edit" ? `/home/updateperson` : '/home/addperson';

        $.post(action, person, function () {
            modal.hide();
            loadPeople();
        });
    });

    function clearModal() {
        const firstName = $("#firstName").val('');
        const lastName = $("#lastName").val('');
        const age = $("#age").val('');
    }
})