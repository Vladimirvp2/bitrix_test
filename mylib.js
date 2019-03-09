/* 
 * Contains the script to add a new menu item and show the modal dialog with the last lead info
 * @author Vladimir Pishida
 * @version 1.0
*/

// Execute the code when DOM structure is loaded 
BX.ready(function(){ 
	// Open the drop down dialog More event
    BX.addCustomEvent('onPopupFirstShow', function(p) { 
        if (p.uniquePopupId === 'menu-popup-main_buttons_popup_crm_control_panel_menu') 
        { 
			// Find the Setting menu item which needed to be replaced
			var settingsMenuItem = BX.findChild(// find children... 
				BX('popup-window-content-menu-popup-main_buttons_popup_crm_control_panel_menu'),// for parent
				{// with properties
					tag: 'a', 
					className: 'menu-popup-item main-buttons-submenu-item crm-menu-more-settings item16' 
				}, 
				true//search recursively from parent
			); 

			// Create a new menu item The last lead  
			var href = window.location.href;
			var lastLeadMenuItem = BX.create("a", { 
				attrs: { 
					href: href + (href.indexOf('?') === -1 ? '?' : '&') + '&' + 'pdf=1&sessid=' + BX.bitrix_sessid(), 
					className: 'menu-popup-item main-buttons-submenu-item crm-menu-more-settings item17' 
				}, 
				events: {
					 click: BX.proxy(lastLeadAction, this)
				  },
				html : '<span class="menu-popup-item-icon"></span><span class="menu-popup-item-text"><span class="main-buttons-item-text"><span class="main-buttons-item-edit-button"></span><span class="main-buttons-item-text-title">Последний лид</span><span class="main-buttons-item-drag-button"></span><span class="main-buttons-item-text-marker"></span></span><span class="main-buttons-item-counter" data-counter=""></span></span>'
			}); 

			// Insert the new menu item The last lead and remove the menu item Settings
			BX.insertAfter(lastLeadMenuItem, settingsMenuItem);
			BX.remove( settingsMenuItem );
        }

		// Click on the Last lead menu item action
		function lastLeadAction (e){
			e.preventDefault();
	
			// create modal dialog with close button
			var popup = BX.PopupWindowManager.create("popup-message", null, {
				content: '<div id="my-popup-last-lead" style="max-width: 500px;"><span class="my-popup-last-lead-text"></span></div>',
				darkMode: false,
				autoHide: true,
				buttons: [
					new BX.PopupWindowButton({
						text: "Закрыть" ,
						className: "webform-button-link-cancel" ,
						events: {click: function(){
								 this.popupWindow.close();
						}}
					})
				]
			});
	
			// Invoke ajax call to get the last lead data
		   jQuery.ajax({
				url:     "/ajax/my_server.php", //url 
				type:     "POST", 
				dataType: "json", 
				success: function(response) { 
					// Insert the data about the last lead and show the modal dialog
					$( "div#my-popup-last-lead span.my-popup-last-lead-text" ).text( response.data );
					popup.show();
				},
				error:function (xhr, ajaxOptions, thrownError) {
					   alert(xhr.status);
        				alert(thrownError);
					$( "div#my-popup-last-lead span.my-popup-last-lead-text" ).text( "Ошибка при загрузке данных" );
					popup.show();
				}
			}); // end ajax
		} // end lastLeadAction function declaration

    }); // end BX.addCustomEvent
}); // end BX.ready