#include "Evaluator.hpp"

Evaluator::Evaluator()
{
    printf("welcome to evaluator\n");
    ground_truths = {
        {"phone", {
            "Samsung Galaxy A36 5G",
            "Samsung Galaxy S25",
            "Samsung Galaxy A16",
            "Samsung Galaxy A35 5G",
            "Samsung Galaxy A56 5G",
            "Samsung Galaxy A55 5G",
            "Samsung Galaxy A05",
            "Samsung Galaxy A14",
            "Samsung Galaxy A25",
            "Samsung Galaxy A34",
            "Samsung Galaxy S25 Ultra (12GB-256GB)",
            "Samsung Galaxy Z Flip 6",
            "Samsung Galaxy S25 Ultra",
            "Samsung Galaxy Z Fold 4"
        }}
    };
}

void Evaluator::test_func(Result res)
{
}
void Evaluator::calculate_f1(std::vector<Result> result, std::string test_query)
{
    // Get truth of test query
    std::vector<std::string> truth = ground_truths[test_query];

    if (truth.size() == 0) {
        return;
    }

    int rel_count = 0; //not of relevant documents retrieved
    double precision = 0.0;
    double recall = 0.0;

    int total_retrieved_docs = result.size();

    for (auto res : result) {
        std::cout << res.title + "\n";
        for (auto t : truth) {
            t = t + "\r";
            if (res.title == t) {
                std::cout << t + "\n";
                ++rel_count;
            }
        }
    }

    // match the result and the truth, and see how many match up
    precision = rel_count / total_retrieved_docs;
    recall = rel_count / truth.size();

    std::cout << rel_count << "\n";
    std::cout << recall << "\n";
    std::cout << precision << "\n";
    std::cout << total_retrieved_docs << "\n";
    // formula
    if (precision+recall == 0) {
        std::cout << "p+r=0\n";
        return;
    }

    double f1_score = (2 * (precision * recall)) / (precision + recall);
    std::cout << "F1 SCORE : " << f1_score << "\n";
}
