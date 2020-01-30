	if (typeof(Storage) !== "undefined") {
				var count = localStorage.getItem("count");
				var data_comment = "comment" + count;

				/*appel de données qui se trouvent dans la locale stroage*/
				$ (function() {
					 livre_get_list();
				});
				/*appel de données qui se trouvent dans la locale stroage*/

				function watchedDate() {
					var date_inf=new Date();
					var day=date_inf.getDay();
					var month=date_inf.getMonth();
					var year=date_inf.getFullYear();
					var hour=date_inf.getHours();
					var minute=date_inf.getMinutes();
					var days_name= ['Dimanche', 'Lundi', 'Mardi','Mercredi','Jeuidi','Vendredi','Samedi'];
					var month_names= ['Janvier', 'Fevrier', 'Mars','Avril','Mai','Juin','Juiellette','Aout','Septembre','Octobre','Novembre','Decembre'];
					watched_on_date= (date_inf.getDate()+' '+month_names[month]+' '+year+' '+days_name[day]+' - '+hour+':'+minute);
				}

				/*Ajouter des livres*/
				function livre_insert () {
					//control d'espace vide
					if (document.getElementById('livre_name').value == "" || document.getElementById('livre_description').value == "" || document.getElementById('date_inf').value == ""|| document.getElementById('ecrivain_name').value == "") {
						document.getElementById("description").innerHTML ="Obligation de remplir";
					}else {
					document.getElementById("description").innerHTML = "";
					count++;
					document.getElementById("watch_ount").innerHTML = count; //Le nombre de mes livre.

					localStorage.setItem("count", count);// le nombre de livre dans la locale.
					localStorage.setItem("livre"+count, (document.getElementById('livre_name').value));
					localStorage.setItem("comment"+count, (document.getElementById('livre_description').value));//l'espace de comment
					watchedDate();
					localStorage.setItem("date"+count, (document.getElementById('date_inf').value)); //l'info de la date
					console.log(watched_on_date);
					localStorage.setItem("ecrivain"+count, (document.getElementById('ecrivain_name').value));
					

					var data = localStorage.getItem("livre" + count);
					var temp_data;
					if (data.length > 12) {
						temp_data = data.substring(0,12) + "...";
					}
					else {
						temp_data = data;
					}
					document.getElementById("livre_list").innerHTML += '<tr id='+count+' ><td style="padding-left:13px;">' + temp_data + '</td><td align="center"><span id="' + data_comment + '" class="description" onclick="get_description('+count+')" data-toggle="modal" data-target=".detail">Informations</span></td><td align="center"><span onclick="get_comment('+count+')" data-toggle="modal" data-target=".update-comment" class="update">Gérer</span></td><td align="center"><span class="delete" onclick="deleted('+count+')">x</span></td></tr>';
					document.getElementById('livre_name').value = "";
					document.getElementById('livre_description').value = "";
					document.getElementById('date_inf').value = "";
					document.getElementById('ecrivain_name').value = "";
					}
				}
				/*ajouter des livres*/

				/*effacer des livres*/
				function deleted(i) {
					count=count-1;
					document.getElementById("watch_ount").innerHTML = count;
					localStorage.setItem("count",count);
					$("#"+i).remove();
					localStorage.removeItem("livre"+i);
					localStorage.removeItem("ecrivain"+i);
					localStorage.removeItem("comment"+i);
					localStorage.removeItem("date"+i);
					
				}
				/*effacer des livres*/

				/*appel de mise à jour pour des livres*/
				function get_comment (i) {
					document.getElementById('hidden_update_id').value = i;
					document.getElementById('livre_name_update').value = localStorage.getItem("livre"+i);
					document.getElementById('livre_description_update').value = localStorage.getItem("comment"+i)
					document.getElementById('date_inf_update').value = localStorage.getItem("date"+i)
					document.getElementById('ecrivain_name_update').value = localStorage.getItem("ecrivain"+i)
				}
				/*appel de mise à jour pour des livres*/

				/*mise à jour des livres*/
				function update(){
					i = document.getElementById('hidden_update_id').value;
					localStorage.setItem("livre"+i, (document.getElementById('livre_name_update').value));
					localStorage.setItem("comment"+i, (document.getElementById('livre_description_update').value));
					localStorage.setItem("date"+i, (document.getElementById('date_inf_update').value));
					localStorage.setItem("ecrivain"+i, (document.getElementById('ecrivain_name_update').value));
					var data = localStorage.getItem("livre" + count);
					var temp_data;
					if (data.length > 12) {
					  temp_data = data.substring(0,12) + "...";
					}
					else {
					  temp_data = data;
					}
					
					livre_get_list();
				}
				/*mise à jour des livres*/

				/* le button d'information*/
				function get_description (i) {
					document.getElementById('livre_description_div').innerHTML = 'livre : '+localStorage.getItem("livre"+i)+'<br>Comments : '+localStorage.getItem("comment"+i) + '<br> La date de debut de lecture : ' +localStorage.getItem("date"+i) +'<br> Ecrivain  : ' +localStorage.getItem("ecrivain"+i);
				}
				
				function livre_get_list() {
					document.getElementById("livre_list").innerHTML = "";
					document.getElementById("watch_ount").innerHTML = count;
					for (s=1; s <= count; s++) {
						var data = localStorage.getItem("livre" + s);
						var temp_data;
						if (data.length > 12) { // En cas de on ecris trop
							temp_data = data.substring(0,12) + "...";
						}
						else {
							temp_data = data;
						}
						
						document.getElementById("livre_list").innerHTML += '<tr id='+s+' ><td style="padding-left:13px;">' + temp_data + '</td><td align="center"><span id="' + data_comment + '" class="description" onclick="get_description('+s+')" data-toggle="modal" data-target=".detail">Informations</span></td><td align="center"><span onclick="get_comment('+s+')" data-toggle="modal" data-target=".update-comment" class="update">Gérer</span></td><td align="center"><span class="delete" onclick="deleted('+s+')">x</span></td></tr>';
					};
				}
				/*supprimer*/
				function insert_clear_btn () {
					document.getElementById('livre_name').value = "";
					document.getElementById('livre_description').value = "";
					document.getElementById('date_inf').value = "";
					document.getElementById('ecrivain_name').value = "";
				}
				function update_clear_btn () {
					document.getElementById('livre_name_update').value = "";
					document.getElementById('livre_description_update').value = "";
					document.getElementById('date_inf_update').value = "";
					document.getElementById('ecrivain_name_update').value = "";
				}
				/*supprimer*/

				
	} else {
		alert("local storage ne fonctionne pas.");
		
	}
