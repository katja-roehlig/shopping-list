
# 🛒 Smart Shopping List 

Shopping-list helps not to forget any items while you´re shopping! 😊

Shopping-list is programmed specifically for mobile phones 📱 or tablets. It helps you to collect your needed things under the respective store name 🏪 so you never forget them while shopping.

As a high-performance **Progressive Web App (PWA)**, it operates completely frameworkless, utilizing an intelligent dynamic storage architecture to manage multiple independent lists seamlessly.

---

## 📖 User Guide & Instruction Manual

1. **Choose your store:** First, write the store you want to go shopping in into the input field and click "enter".
2. **Add your goods:** After that, you can type in the goods you need. With the **+ button** or "enter", you can add the goods to your list.
3. **Check them off:** When you have bought something, you can check it off by clicking on the checkbox.
4. **Clean up your list:** With the **X-button**, you delete already bought things. 
5. **Change stores:** If you click on the selected store at the top, you can easily change it or type in a new one.

## 📖 User Guide & Instruction Manual

1. **Choose your store:** First, write the store you want to go shopping in into the input field and click "enter".
2. **Add your goods:** After that, you can type in the goods you need. With the **+ button** or "enter", you can add the goods to your list.
3. **Check them off:** When you have bought something, you can check it off by clicking on the checkbox.
4. **Clean up your list:** With the **X-button**, you delete already bought things. 
5. **Change stores:** If you click on the selected store at the top, you can easily change it or type in a new one.

> **Good to know:** Your shopping lists are safely saved in the background! Even if you switch between different stores or close the app, your items remain intact until you decide to delete them.

---


## 🚀 Architecture & App Logic
This project serves as a showcase for high-performance frontend engineering using **pure web standards** without the overhead of Node.js, `package.json`, or external bundling libraries (like Vite or Webpack). 

- **Dynamic Store Management:** 
  - Upon entering the app, you are greeted with the main "Einkaufsliste" heading and a dedicated input field to enter a store name.
  - Clicking the button next to the input locks in the store name and displays it prominently at the top.
  - Tapping the displayed store name allows you to edit or change it at any time.
- **Multiple Smart Lists via LocalStorage:**
  - Every time you add items (e.g., Shampoo, Toothpaste), they are saved under the specific store's name (e.g., *"Drogeriemarkt"*) inside the browser's `LocalStorage`.
  - Changing the top store name to something else (e.g., *"Supermarkt"*) instantly switches the view to that store's unique item list, saving it separately. You can jump back and forth between stores, and your items remain intact.
- **Smart Check & Clear Workflow:**
  - Each item comes with an interactive checkbox to tick off goods while walking through the store.
  - Tapping the **Delete Button** clears *only* the items that are currently checked/completed.
  - **Persistent Unbought Items:** If you didn't find anything, unchecked items remain safely on the list for your next visit.
  - **Automatic Cleanup:** The app automatically deletes the entire store key from `LocalStorage` only when the list becomes completely empty.
- **Cross-Browser Mobile Optimization:**
  - Features a custom, fluid SCSS typography design (`62.5%` root scaling shifting to `75%` on screens `<480px`).
  - Utilizes an inherited font-size hierarchy on form components to natively bypass the notorious iOS Safari input-focus auto-zoom bug, ensuring a rock-solid UI during typing.

---

## 📱 PWA Installation Guide

This application includes a registered **Service Worker** for caching and offline availability, stripping away all browser address bars for a native fullscreen app experience.

### 🍏 On iOS (Safari)
1. Open the app URL in your native **Safari** browser.
2. Tap the **Share** button (the square icon with an upward arrow at the bottom).
3. Scroll down the share sheet and select **Add to Home Screen**.
4. Confirm the name, and the app icon will appear directly on your iPhone home screen.

### 🤖 On Android (Google Chrome)
1. Open the app URL in **Google Chrome**.
2. Tap the **Three Dots** menu icon in the top right corner.
3. Select **Install app** or **Add to Home screen** from the menu.

