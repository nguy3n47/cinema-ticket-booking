/**
 * Magento Enterprise Edition
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magento Enterprise Edition License
 * that is bundled with this package in the file LICENSE_EE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.magentocommerce.com/license/enterprise-edition
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    design
 * @package     rwd_default
 * @copyright   Copyright (c) 2014 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://www.magentocommerce.com/license/enterprise-edition
 */

function banner(obj) 
{	
	jQuery(obj)
	.cycle({
		slides: '> li',
		speed: 600,
		pauseOnHover: true,
		swipe: true,
		prev: '.slideshow-prev',
		next: '.slideshow-next',
		fx: 'scrollHorz',
	});
}

function togglecontent(obj){
	$j('.'+obj).each(function () {
		var wrapper = jQuery(this);

		var hasTabs = wrapper.hasClass('tabs');

		var dl = wrapper.children('dl:first');
		var dts = dl.children('dt');
		var panes = dl.children('dd');
		var groups = new Array(dts, panes);

		//Create a ul for tabs if necessary.
		if (hasTabs) {
			var ul = jQuery('<ul class="toggle-tabs"></ul>');
			dts.each(function () {
				var dt = jQuery(this);
				var li = jQuery('<li></li>');
				li.html(dt.html());
				ul.append(li);
			});
			ul.insertBefore(dl);
			var lis = ul.children();
			groups.push(lis);
		}

		//Add "last" classes.
		var i;
		for (i = 0; i < groups.length; i++) {
			groups[i].filter(':last').addClass('last');
		}

		function toggleClasses(clickedItem, group) {
			var index = group.index(clickedItem);
			var i;
			for (i = 0; i < groups.length; i++) {
				groups[i].removeClass('current');
				groups[i].eq(index).addClass('current');
			}
		}

		//Toggle on tab (li) click.
		if (hasTabs) {
			lis.on('click', function (e) {
				toggleClasses(jQuery(this), lis);
			});
			//Open the first tab.
			lis.eq(0).trigger('click');
		}
	});
}