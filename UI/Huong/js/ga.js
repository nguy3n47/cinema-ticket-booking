/**
 * Magento Enterprise Edition
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magento Enterprise Edition End User License Agreement
 * that is bundled with this package in the file LICENSE_EE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.magento.com/license/enterprise-edition
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magento.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magento.com for more information.
 *
 * @category    Mage
 * @package     js
 * @copyright Copyright (c) 2006-2017 X.commerce, Inc. and affiliates (http://www.magento.com)
 * @license http://www.magento.com/license/enterprise-edition
 */

var dlCurrencyCode = '';
var dataLayer = [];
var staticImpressions = [];
var staticPromotions = [];
var updatedImpressions = [];
var updatedPromotions = [];
var cookieAddToCart = 'add_to_cart';
var cookieRemoveFromCart = 'remove_from_cart';
var bannerCounter = 0;
var googleAnalyticsUniversalData = googleAnalyticsUniversalData || {
        'shoppingCartContent' : []
    };


function GoogleAnalyticsUniversal(){}
GoogleAnalyticsUniversal.prototype = {
    activeOnCategory : function(id, name, category, list, position) {
        dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
                'click': {
                    'actionField': {
                        'list': list
                    },
                    'products': [{
                        'id': id,
                        'name': name,
                        'category': category,
                        'list': list,
                        'position': position
                    }]
                }
            }
        });
    },
    activeOnProducts : function(id, name, list, position) {
        dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
                'click': {
                    'actionField': {
                        'list': list
                    },
                    'products': [{
                        'id': id,
                        'name': name,
                        'list': list,
                        'position': position
                    }]
                }
            }
        });
    },
    addToCart : function(id, name, price, quantity) {
        dataLayer.push({
            'event': 'addToCart',
            'ecommerce': {
                'currencyCode' : dlCurrencyCode,
                'add': {
                    'products': [{
                                'id': id,
                                'name': name,
                                'price': price,
                                'quantity': quantity
                    }]
                }
            }
        });
    },
    clickBanner : function(id, name, creative, position) {
        dataLayer.push({
            'event': 'promotionClick',
            'ecommerce': {
                'promoClick': {
                    'promotions': [{
                        'id': id,
                        'name': name,
                        'creative': creative,
                        'position': position
                    }]
                }
            }
        });
    },
    bindImpressionClick : function(id, type, name, category, list, position, blockType, listPosition) {
        var productLink = [];
        var eventBlock;
        switch (blockType)  {
            case 'catalog.product.related':
                eventBlock = '.box-related';
                break;
            case 'product.info.upsell':
                eventBlock = '.box-up-sell';
                break;
            case 'checkout.cart.crosssell':
                eventBlock = '.crosssell';
                break;
            case 'product_list':
            case 'search_result_list':
                eventBlock = '.category-products';
                break;
        }
        productLink = $$(eventBlock + ' .item:nth(' + (listPosition) + ') a');
        if (type == 'configurable' || type == 'bundle' || type == 'grouped') {
            productLink = $$(eventBlock + ' .item:nth(' + (listPosition) + ') .btn-cart', eventBlock + ' .item:nth(' + (listPosition) + ') a');
        }
        productLink.each(function(element) {
            element.observe('click', function(event) {
                googleAnalyticsUniversal.activeOnProducts(
                    id,
                    name,
                    list,
                    position);
            });
        });
    },

    updateImpressions: function() {
        var pageImpressions = this.mergeImpressions();
        var dlImpressions = {
            'event' : 'productImpression',
            'ecommerce' : {
                'impressions' : []
            }
        };
        var impressionCounter = 0;
        for (blockName in pageImpressions) {
            if (blockName === 'length' || !pageImpressions.hasOwnProperty(blockName)) continue;
            for (var i = 0; i < pageImpressions[blockName].length; i++) {
                var impression = pageImpressions[blockName][i];
                dlImpressions.ecommerce.impressions.push({
                    'id': impression.id,
                    'name': impression.name,
                    'category': impression.category,
                    'list': impression.list,
                    'position': impression.position
                });
                impressionCounter++;
                this.bindImpressionClick(impression.id, impression.type, impression.name,
                    impression.category, impression.list, impression.position, blockName, impression.listPosition);
            }
        }
        if (impressionCounter > 0) {
            dataLayer.push(dlImpressions);
        }
    },

    mergeImpressions: function() {
        var pageImpressions = [];
        var blockNames = [
            'product_list',
            'product.info.upsell',
            'catalog.product.related',
            'checkout.cart.crosssell',
            'search_result_list'
        ];
        blockNames.each(function(blockName) {
            // check if there is a new block generated by FPC placeholder update
            if (blockName in updatedImpressions) {
                pageImpressions[blockName] = updatedImpressions[blockName];
            } else if (blockName in staticImpressions) { // use the static data otherwise
                pageImpressions[blockName] = staticImpressions[blockName];
            }
        });
        return pageImpressions;
    },

    updatePromotions : function() {
        var dlPromotions = {
            'event' : 'promotionView',
            'ecommerce': {
                'promoView': {
                    'promotions' : []
                }
            }
        };
        var pagePromotions = [];
        // check if there is a new block generated by FPC placeholder update
        if (updatedPromotions.length) {
            pagePromotions = updatedPromotions;
        }
        // use the static data otherwise
        if (pagePromotions.length == 0 && staticPromotions.length) {
            pagePromotions = staticPromotions;
        }
        var promotionCounter = 0;
        for (var i = 0; i < pagePromotions.length; i++) {
            var promotion = pagePromotions[i];
            var banner = $('banner-' + promotion.id);
            if (!banner || promotion.activated == '0') {
                continue;
            }
            dlPromotions.ecommerce.promoView.promotions.push({
                'id': promotion.id,
                'name': promotion.name,
                'creative': promotion.creative,
                'position': promotion.position
            });
            promotionCounter++;
            this.bindPromotionClick(banner, promotion.id, promotion.name, promotion.creative, promotion.position);

        }
        if (promotionCounter > 0) {
            dataLayer.push(dlPromotions);
        }
    },

    bindPromotionClick: function(banner, id, name, creative, position) {
        banner.observe('click',
            function(event) {
                googleAnalyticsUniversal.clickBanner(id, name, creative, position);
            });
    }
};

GoogleAnalyticsUniversalCart = function(){
    this.productQtys = [];
    this.origProducts = {};
    this.productWithChanges = [];
    this.addedProducts = [];
    this.removedProducts = [];
};
GoogleAnalyticsUniversalCart.prototype = {
    // ------------------- shopping cart ------------------------
    listenMinicartReload : function() {
        var context = this;
        if (typeof(Minicart) != 'undefined' && typeof(Minicart.prototype.initAfterEvents)) {
            Minicart.prototype.initAfterEvents['GoogleAnalyticsUniversalCart:subscribeProductsUpdateInCart']
                = function() {
                    context.subscribeProductsUpdateInCart();
                    context.parseAddToCartCookies();
                    context.parseRemoveFromCartCookies();
                };
            // if we are removing last item init don't calling
            Minicart.prototype.removeItemAfterEvents['GoogleAnalyticsUniversalCart:subscribeProductsRemoveFromCart']
                = function() {
                context.parseRemoveFromCartCookies();
            };
        }
    },
    subscribeProductsUpdateInCart : function() {
        var context = this;
        $$('[data-cart-item-update]').each(function(element) {
            $(element).stopObserving('click').observe('click', function(){
                context.updateCartObserver();
            });
        });
        $$('[data-multiship-item-update]').each(function(element) {
            $(element).stopObserving('click').observe('click', function(){
                context.updateMulticartCartObserver();
            });
        });
        $$('[data-cart-empty]').each(function(element){
            $(element).stopObserving('click').observe('click', function(){
                context.emptyCartObserver();
            });
        });
    },
    emptyCartObserver : function() {
        this.collectOriginalProducts();
        for (var i in this.origProducts) {
            if (i != 'length' && this.origProducts.hasOwnProperty(i)) {
                var product = Object.extend({}, this.origProducts[i]);
                this.removedProducts.push(product);
            }
        }
        this.cartItemRemoved();
    },
    updateMulticartCartObserver : function() {
        this.collectMultiProductsWithChanges();
        this.collectProductsForMessages();
        this.cartItemAdded();
        this.cartItemRemoved();
    },
    updateCartObserver : function() {
        this.collectProductsWithChanges();
        this.collectProductsForMessages();
        this.cartItemAdded();
        this.cartItemRemoved();
    },
    collectMultiProductsWithChanges : function() {
        this.collectOriginalProducts();
        this.collectMultiCartQtys();
        this.productWithChanges = [];
        var groupedProducts = {};
        for (var i = 0; i < this.productQtys.length; i++) {
            var cartProduct = this.productQtys[i];
            if (typeof(groupedProducts[cartProduct.id]) == 'undefined') {
                groupedProducts[cartProduct.id] = parseInt(cartProduct.qty, 10);
            } else {
                groupedProducts[cartProduct.id] += parseInt(cartProduct.qty, 10);
            }
        }
        for (var j in groupedProducts) {
            if (groupedProducts.hasOwnProperty(j)) {
                if ((typeof(this.origProducts[j]) != 'undefined') && (groupedProducts[j] != this.origProducts[j].qty)) {
                    var product = Object.extend({}, this.origProducts[j]);
                    product['qty'] = groupedProducts[j];
                    this.productWithChanges.push(product);
                }
            }
        }
    },
    collectProductsWithChanges : function () {
        this.collectOriginalProducts();
        this.collectCartQtys();
        this.productWithChanges = [];
        for (var i = 0; i < this.productQtys.length; i++) {
            var cartProduct = this.productQtys[i];
            if ((typeof(this.origProducts[cartProduct.id]) != 'undefined') && (cartProduct.qty != this.origProducts[cartProduct.id].qty)) {
                var product = Object.extend({}, this.origProducts[cartProduct.id]);
                if (parseInt(cartProduct.qty, 10) > 0) {
                    product['qty'] = cartProduct.qty;
                    this.productWithChanges.push(product);
                }
            }
        }
    },
    collectOriginalProducts : function() {
        if (googleAnalyticsUniversalData && googleAnalyticsUniversalData['shoppingCartContent']) {
            this.origProducts = googleAnalyticsUniversalData['shoppingCartContent'];
        }
    },
    collectMultiCartQtys : function() {
        var productQtys = [];
        $$('[data-multiship-item-id]').each(function(element){
            productQtys.push({
                'id' : $(element).readAttribute('data-multiship-item-id'),
                'qty' : $(element).getValue()
            });
        });
        this.productQtys = productQtys;
    },
    collectCartQtys : function() {
        var productQtys = [];
        $$('[data-cart-item-id]').each(function(element){
            productQtys.push({
                'id' : $(element).readAttribute('data-cart-item-id'),
                'qty' : $(element).getValue()
            });
        });
        this.productQtys = productQtys;
    },
    collectProductsForMessages : function() {
        this.addedProducts = [];
        this.removedProducts = [];
        for (var i = 0; i < this.productWithChanges.length; i++) {
            var product = this.productWithChanges[i];
            if (typeof(this.origProducts[product.id]) != 'undefined') {
                if (product.qty > this.origProducts[product.id].qty) {
                    product.qty = Math.abs(this.origProducts[product.id].qty - product.qty);
                    this.addedProducts.push(product);
                } else if (product.qty < this.origProducts[product.id].qty && product.qty != 0) {
                    product.qty = product.qty - this.origProducts[product.id].qty;
                    this.addedProducts.push(product);
                } else {
                    product.qty = Math.abs(product.qty - this.origProducts[product.id].qty);
                    this.removedProducts.push(product);
                }
            }
        }
    },
    formatProductsArray : function(productsIn) {
        var productsOut = [];
        var itemId;
        for (var i in productsIn)
        {
            if (i != 'length' && productsIn.hasOwnProperty(i)) {
                if (typeof(productsIn[i]['sku']) != 'undefined') {
                    itemId = productsIn[i].sku;
                } else {
                     itemId = productsIn[i].id;
                }
                productsOut.push({
                    'id': itemId,
                    'name': productsIn[i].name,
                    'price': productsIn[i].price,
                    'quantity': parseInt(productsIn[i].qty, 10)
                });
            }
        }
        return productsOut;
    },
    cartItemAdded : function() {
        if (this.addedProducts.length == 0) {
            return;
        }
        dataLayer.push({
            'event': 'addToCart',
            'ecommerce': {
                'currencyCode' : dlCurrencyCode,
                'add': {
                    'products': this.formatProductsArray(this.addedProducts)
                }
            }
        });
        this.addedProducts = [];
    },
    cartItemRemoved : function() {
        if (this.removedProducts.length == 0) {
            return;
        }
        dataLayer.push({
            'event': 'removeFromCart',
            'ecommerce': {
                'currencyCode' : dlCurrencyCode,
                'remove': {
                    'products': this.formatProductsArray(this.removedProducts)
                }
            }
        });
        this.removedProducts = [];
    },
    parseAddToCartCookies : function(){
        if(getCookie(cookieAddToCart)){
            this.addedProducts = [];
            var addProductsList = decodeURIComponent(getCookie(cookieAddToCart));
            this.addedProducts = JSON.parse(addProductsList);
            delCookie(cookieAddToCart);
            this.cartItemAdded();
        }
    },
    parseRemoveFromCartCookies : function(){
        if(getCookie(cookieRemoveFromCart)){
            this.removedProducts = [];
            var removeProductsList = decodeURIComponent(getCookie(cookieRemoveFromCart));
            this.removedProducts = JSON.parse(removeProductsList);
            delCookie(cookieRemoveFromCart);
            this.cartItemRemoved();
        }
    }
};

var googleAnalyticsUniversal = new GoogleAnalyticsUniversal();
var googleAnalyticsUniversalCart = new GoogleAnalyticsUniversalCart();

document.observe('dom:loaded', function() {
    googleAnalyticsUniversal.updatePromotions();
    googleAnalyticsUniversal.updateImpressions();
    googleAnalyticsUniversalCart.parseAddToCartCookies();
    googleAnalyticsUniversalCart.parseRemoveFromCartCookies();
    googleAnalyticsUniversalCart.subscribeProductsUpdateInCart();
    googleAnalyticsUniversalCart.listenMinicartReload();
    dataLayer.push({'ecommerce':{'impressions':0,'promoView':0}});
});

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset);
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}

function delCookie(name) {
    var cookie = name + "=" + "; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=." + window.location.host;
    document.cookie = cookie;
}
