describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');

    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });

    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  // We use .skip() here because this test has a TODO that has not been completed yet.
  // Make sure to remove the .skip after you finish the TODO. 
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');

    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;

    // Query select all of the <product-item> elements
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        // Grab all of the json data stored inside
        return data = item.data;
      });
    });

    for (let i = 0; i < prodItemsData.length; i++) {
      const value = prodItemsData[i];
      console.log(`Checking product item ${i + 1}/${prodItemsData.length}`);

      // Make sure the title, price, and image are populated in the JSON
      if (value.title.length == 0) { allArePopulated = false; }
      if (value.price.length == 0) { allArePopulated = false; }
      if (value.image.length == 0) { allArePopulated = false; }

      // Checking all the params because why not
      if (value.category.length == 0) { allArePopulated = false; }
      if (value.description.length == 0) { allArePopulated = false; }
      if (value.id.length == 0) { allArePopulated = false; }
      if (value.rating.count.length == 0) { allArePopulated = false; }
      if (value.rating.rate.length == 0) { allArePopulated = false; }
    }

    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);

    /**
    **** DONE - STEP 1 ****
    * Right now this function is only checking the first <product-item> it found, make it so that
      it checks every <product-item> it found
    * Remove the .skip from this it once you are finished writing this test.
    */

  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');

    /**
     **** DONE - STEP 2 **** 
     * Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
     * Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
     * Once you have the button, you can click it and check the innerText property of the button.
     * Once you have the innerText property, use innerText.jsonValue() to get the text value of it
     * Remember to remove the .skip from this it once you are finished writing this test.
     */  

    const first_product_item = await page.$('product-item');
    const first_product_item_shadow_root = await first_product_item.getProperty('shadowRoot');
    const first_product_item_button = await first_product_item_shadow_root.$('button');
    await first_product_item_button.click();
    const button_text = await (await first_product_item_button.getProperty('innerText')).jsonValue();
    expect(button_text).toBe('Remove from Cart');
    // Unclick button or it breaks next test
    await first_product_item_button.click();
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');

    /**
     **** DONE - STEP 3 **** 
     * Query select all of the <product-item> elements, then for every single product element
       get the shadowRoot and query select the button inside, and click on it.
     * Check to see if the innerText of #cart-count is 20
     * Remember to remove the .skip from this it once you are finished writing this test.
     */

    const product_items = await page.$$('product-item');
    for (let i = 0; i < product_items.length; i++) {
      console.log(`Adding product item ${i + 1}/${product_items.length}`);
      
      const product_item = product_items[i];
      const product_item_shadow_root = await product_item.getProperty('shadowRoot');
      const product_item_button = await product_item_shadow_root.$('button');
      await product_item_button.click();
    }

    const cart_count = await page.$('#cart-count');
    const cart_count_text = await (await cart_count.getProperty('innerText')).jsonValue();
    expect(cart_count_text).toBe('20');
  }, 20000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    /**
     **** DONE - STEP 4 **** 
     * Reload the page, then select all of the <product-item> elements, and check every
       element to make sure that all of their buttons say "Remove from Cart".
     * Also check to make sure that #cart-count is still 20
     * Remember to remove the .skip from this it once you are finished writing this test.
     */
    
    await page.reload();

    const product_items = await page.$$('product-item');
    for (let i = 0; i < product_items.length; i++) {
      console.log(`Checking product item button ${i + 1}/${product_items.length}`);
      
      const product_item = product_items[i];
      const product_item_shadow_root = await product_item.getProperty('shadowRoot');
      const product_item_button = await product_item_shadow_root.$('button');
      const button_text = await (await product_item_button.getProperty('innerText')).jsonValue();
      expect(button_text).toBe('Remove from Cart');
    }

    const cart_count = await page.$('#cart-count');
    const cart_count_text = await (await cart_count.getProperty('innerText')).jsonValue();
    expect(cart_count_text).toBe('20');
  }, 30000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {

    /**
     **** DONE - STEP 5 **** 
     * At this point the item 'cart' in localStorage should be 
       '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
     * Remember to remove the .skip from this it once you are finished writing this test.
     */

    // Just copied from storage#getItems, wasn't sure how to load scripts since just calling getItems() didn't work...
    // I suppose it would be better to somehow call storage#getItems since in theory that getter function could change and
    // then this test wouldn't be helpful. If that did happen though, I guess it would fail anyway since the expected
    // toBe value would probably be different...
    const cart = await page.evaluate(() => JSON.parse(localStorage.getItem('cart')) || []);
    expect(cart).toStrictEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');

    /**
     **** DONE - STEP 6 **** 
     * Go through and click "Remove from Cart" on every single <product-item>, just like above.
     * Once you have, check to make sure that #cart-count is now 0
     * Remember to remove the .skip from this it once you are finished writing this test.
     */

    const product_items = await page.$$('product-item');
    for (let i = 0; i < product_items.length; i++) {
      console.log(`Clicking product item button ${i + 1}/${product_items.length}`);

      const product_item = product_items[i];
      const product_item_shadow_root = await product_item.getProperty('shadowRoot');
      const product_item_button = await product_item_shadow_root.$('button');
      await product_item_button.click();
    }

    const cart_count = await page.$('#cart-count');
    const cart_count_text = await (await cart_count.getProperty('innerText')).jsonValue();
    expect(cart_count_text).toBe('0');
  }, 30000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    /**
     **** DONE - STEP 7 **** 
     * Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
       is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
     * Also check to make sure that #cart-count is still 0
     * Remember to remove the .skip from this it once you are finished writing this test.
     */

    await page.reload();

    const product_items = await page.$$('product-item');
    for (let i = 0; i < product_items.length; i++) {
      console.log(`Checking product item button ${i + 1}/${product_items.length}`);
      
      const product_item = product_items[i];
      const product_item_shadow_root = await product_item.getProperty('shadowRoot');
      const product_item_button = await product_item_shadow_root.$('button');
      const button_text = await (await product_item_button.getProperty('innerText')).jsonValue();
      expect(button_text).toBe('Add to Cart');
    }

    const cart_count = await page.$('#cart-count');
    const cart_count_text = await (await cart_count.getProperty('innerText')).jsonValue();
    expect(cart_count_text).toBe('0');

  }, 15000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');

    /**
     **** DONE - STEP 8 **** 
     * At this point he item 'cart' in localStorage should be '[]', check to make sure it is
     * Remember to remove the .skip from this it once you are finished writing this test.
     */

    // Same deal as with step 5...
    const cart = await page.evaluate(() => JSON.parse(localStorage.getItem('cart')) || []);
    expect(cart).toStrictEqual([]);
  });
});
