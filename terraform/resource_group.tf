## リソースグループ
##
resource "azurerm_resource_group" "bca" {
  name     = "bugyo-cloud-agent"
  location = local.location
}
