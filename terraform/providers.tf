# We strongly recommend using the required_providers block to set the
# Azure Provider source and version being used
terraform {
  required_providers {
    archive = {
      source = "hashicorp/archive"
      # 2.4.2 以降は、アーカイブの空チェックが入る。
      # version = "2.4.1"
    }
    azurerm = {
      source = "hashicorp/azurerm"
    }
  }
}

provider "archive" {
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

