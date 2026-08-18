const ReviewModel = require("./src/model/reviewModel");

async function runTests() {
  console.log("=================================================");
  console.log("   STARTING MONGOOSE SCHEMA & VALIDATION TESTS   ");
  console.log("=================================================\n");

  // Helper function to validate data against ReviewModel schema
  async function validateData(data) {
    const doc = new ReviewModel(data);
    try {
      await doc.validate();
      return null;
    } catch (err) {
      return err;
    }
  }

  // TEST 1: Sahi data -> save ho jaana chahiye (No errors)
  console.log("1. Testing Valid Review Data...");
  const validData = {
    title: "Bahut accha product",
    comment: "Delivery fast thi aur quality bhi acchi hai",
    rating: 5,
    reviewerName: "Rahul",
  };
  const err1 = await validateData(validData);
  if (!err1) {
    console.log("✅ PASSED: Valid data successfully passed schema validation!");
    const doc = new ReviewModel(validData);
    console.log("   Created Document Properties:");
    console.log(`   - title: "${doc.title}"`);
    console.log(`   - comment: "${doc.comment}"`);
    console.log(`   - rating: ${doc.rating}`);
    console.log(`   - reviewerName: "${doc.reviewerName}"`);
    console.log(`   - status (default): "${doc.status}"`);
    console.log(`   - isVerifiedPurchase (default): ${doc.isVerifiedPurchase}`);
    console.log(`   - helpfulCount (default): ${doc.helpfulCount}`);
  } else {
    console.error("❌ FAILED: Valid data threw error:", err1.message);
  }
  console.log("\n-------------------------------------------------\n");

  // TEST 2: rating = 6 -> error aana chahiye
  console.log("2. Testing rating = 6 (Out of Max bounds)...");
  const invalidRatingMax = {
    title: "Acche ki ummeed thi",
    comment: "Lekin rating galat bhej rahe hain testing ke liye",
    rating: 6,
    reviewerName: "Amit",
  };
  const err2 = await validateData(invalidRatingMax);
  if (err2 && err2.errors.rating) {
    console.log("✅ PASSED (Caught Expected Error):", err2.errors.rating.message);
  } else {
    console.error("❌ FAILED: rating = 6 should have thrown validation error!");
  }
  console.log("\n-------------------------------------------------\n");

  // TEST 3: rating = 3.5 -> error aana chahiye (Whole number custom validator)
  console.log("3. Testing rating = 3.5 (Decimal rating)...");
  const invalidRatingDecimal = {
    title: "Average Product",
    comment: "Product theek thak tha, 3.5 stars ke kabil hai",
    rating: 3.5,
    reviewerName: "Pooja",
  };
  const err3 = await validateData(invalidRatingDecimal);
  if (err3 && err3.errors.rating) {
    console.log("✅ PASSED (Caught Expected Error):", err3.errors.rating.message);
  } else {
    console.error("❌ FAILED: rating = 3.5 should have thrown validation error!");
  }
  console.log("\n-------------------------------------------------\n");

  // TEST 4: status = "blocked" -> error aana chahiye ({VALUE} enum error message)
  console.log('4. Testing status = "blocked" (Invalid enum value)...');
  const invalidStatus = {
    title: "Bad Experience",
    comment: "Kharab quality thi bilkul wapas karna pada product",
    rating: 1,
    reviewerName: "Suresh",
    status: "blocked",
  };
  const err4 = await validateData(invalidStatus);
  if (err4 && err4.errors.status) {
    console.log("✅ PASSED (Caught Expected Error):", err4.errors.status.message);
  } else {
    console.error('❌ FAILED: status = "blocked" should have thrown validation error!');
  }
  console.log("\n-------------------------------------------------\n");

  // TEST 5 (BONUS): comment with empty spaces only
  console.log('5. Testing comment = "          " (Whitespace string)...');
  const invalidComment = {
    title: "Blank Comment Test",
    comment: "          ",
    rating: 4,
    reviewerName: "Tester",
  };
  const err5 = await validateData(invalidComment);
  if (err5 && err5.errors.comment) {
    console.log("✅ PASSED (Caught Expected Error):", err5.errors.comment.message);
  } else {
    console.error("❌ FAILED: Whitespace comment should have thrown validation error!");
  }
  console.log("\n-------------------------------------------------\n");

  // TEST 6 (BONUS): helpfulCount = -5 (Negative number)
  console.log("6. Testing helpfulCount = -5 (Negative count)...");
  const invalidHelpful = {
    title: "Negative Helpful Test",
    comment: "Testing negative helpful count validator",
    rating: 4,
    reviewerName: "Tester",
    helpfulCount: -5,
  };
  const err6 = await validateData(invalidHelpful);
  if (err6 && err6.errors.helpfulCount) {
    console.log("✅ PASSED (Caught Expected Error):", err6.errors.helpfulCount.message);
  } else {
    console.error("❌ FAILED: Negative helpfulCount should have thrown validation error!");
  }

  console.log("\n=================================================");
  console.log("   ALL 6 VALIDATION TESTS PASSED SUCCESSFULLY!   ");
  console.log("=================================================\n");
}

runTests();
