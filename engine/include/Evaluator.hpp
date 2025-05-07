#ifndef EVALUATOR_H
#define EVALUATOR_H

#include <stdio.h>
#include "QueryResult.hpp"
#include <vector>
#include <unordered_map>
#include <iostream>

class Evaluator
{
private:
    /* data */
    std::unordered_map<std::string, std::vector<std::string>> ground_truths;

public:
    Evaluator();
    void test_func(Result res);
    void calculate_f1(std::vector<Result> result, std::string test_query);
    // ~Evaluator();
};

#endif